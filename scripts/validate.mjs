import { readFile, readdir, realpath, stat } from 'node:fs/promises';
import { resolve, relative, dirname, extname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

export const ROOT = fileURLToPath(new URL('../', import.meta.url));
export const ENDPOINT = 'https://nugit.ai/mcp';
const REPOSITORY = 'https://github.com/matthewrusk/nugit-mcp';
const ignored = new Set(['.git', 'node_modules']);
const manifests = [
  ['.cursor-plugin/plugin.json', '.', 'mcp.json'],
  ['.claude-plugin/plugin.json', '.', './.mcp.json'],
  ['plugins/nugit/.codex-plugin/plugin.json', 'plugins/nugit', './.mcp.json'],
];
const configs = [
  ['mcp.json', 'mcpServers'], ['.mcp.json', 'mcpServers'],
  ['plugins/nugit/.mcp.json', 'mcpServers'],
  ['examples/cursor.json', 'mcpServers'], ['examples/claude-code.json', 'mcpServers'],
  ['examples/vscode.json', 'servers'],
];

function requireValue(condition, message) {
  if (!condition) throw new Error(message);
}

/** Resolve package references without allowing traversal or symlinks outside the root. */
export async function packagePath(root, value) {
  requireValue(typeof value === 'string' && value.length > 0, 'Package reference must be a string');
  requireValue(!value.includes('\\') && !value.startsWith('/') && !value.split('/').includes('..'),
    `Unsafe package reference: ${value}`);
  const base = await realpath(root);
  const target = await realpath(resolve(base, value));
  const rel = relative(base, target);
  requireValue(rel !== '..' && !rel.startsWith(`..${sep}`) && !rel.startsWith(sep),
    `Package reference escapes root: ${value}`);
  requireValue((await stat(target)).isFile(), `Package reference must point to a file: ${value}`);
  return target;
}

async function walk(root, prefix = '') {
  const files = [];
  for (const entry of await readdir(resolve(root, prefix), { withFileTypes: true })) {
    if (ignored.has(entry.name)) continue;
    const path = prefix ? `${prefix}/${entry.name}` : entry.name;
    requireValue(!entry.isSymbolicLink(), `Symlink is not allowed in distribution: ${path}`);
    if (entry.isDirectory()) files.push(...await walk(root, path));
    else files.push(path);
  }
  return files.sort();
}

/** Offline validation of distributable files; no credentials, network or user config access. */
export async function validateRepository(root = ROOT) {
  const files = await walk(root);
  const read = name => readFile(resolve(root, name), 'utf8');
  const json = async name => JSON.parse(await read(name));
  for (const file of files.filter(file => extname(file) === '.json')) await json(file);
  const pkg = await json('package.json');
  requireValue(pkg.private === true, 'This configuration project must not publish an npm runtime');
  requireValue(/^\d+\.\d+\.\d+$/.test(pkg.version), 'Release version must be stable semver');
  for (const key of Object.keys(pkg.scripts)) {
    requireValue(!['preinstall', 'install', 'postinstall', 'prepare', 'prepublishOnly'].includes(key),
      `Unexpected install/publish hook: ${key}`);
  }

  const schemaText = await read('schemas/mcp-server-2025-12-11.schema.json');
  const digest = createHash('sha256').update(schemaText).digest('hex');
  requireValue((await read('schemas/README.md')).includes(digest), 'Vendored schema hash differs from provenance');
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(schemaText));
  const server = await json('server.json');
  requireValue(validate(server), `Registry schema: ${ajv.errorsText(validate.errors)}`);
  requireValue(server.$schema === 'https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json',
    'Unexpected registry schema revision');
  requireValue(server.name === 'io.github.matthewrusk/nugit', 'Do not change the existing registry identity');
  requireValue(server.repository.url === REPOSITORY, 'Registry must point to the public integration repository');
  requireValue(server.version === pkg.version, 'Registry release version mismatch');
  requireValue(JSON.stringify(server.remotes) === JSON.stringify([{ type: 'streamable-http', url: ENDPOINT }]),
    'Registry must use the canonical credential-free Streamable HTTP remote');
  requireValue(!server.packages, 'Hosted service must not advertise a local runtime package');

  for (const [path, base, mcp] of manifests) {
    const manifest = await json(path);
    requireValue(manifest.name === 'nugit' && manifest.version === pkg.version, `${path}: identity/version mismatch`);
    requireValue(manifest.repository === REPOSITORY && manifest.license === 'MIT', `${path}: repository/license mismatch`);
    requireValue(typeof manifest.description === 'string' && manifest.description.length >= 30, `${path}: missing useful description`);
    requireValue(manifest.author?.name === (path === '.cursor-plugin/plugin.json' ? 'MGR Music Tuition Ltd' : 'Matthew Rusk'), `${path}: publisher identity mismatch`);
    requireValue(manifest.mcpServers === mcp, `${path}: unexpected MCP reference`);
    await packagePath(resolve(root, base), mcp);
    requireValue(!('hooks' in manifest) && !('commands' in manifest) && !('agents' in manifest), `${path}: unexpected executable components`);
    if (manifest.logo) await packagePath(resolve(root, base), manifest.logo);
    if (manifest.interface) {
      for (const key of ['logo', 'composerIcon']) await packagePath(resolve(root, base), manifest.interface[key]);
      requireValue(Array.isArray(manifest.interface.defaultPrompt) && manifest.interface.defaultPrompt.length <= 3,
        `${path}: invalid starter prompts`);
      requireValue(manifest.interface.defaultPrompt.every(prompt => typeof prompt === 'string' && prompt.length <= 128),
        `${path}: starter prompt too long`);
    }
  }
  for (const [path, wrapper] of configs) {
    const config = await json(path);
    requireValue(Object.keys(config).length === 1 && config[wrapper], `${path}: wrong client configuration wrapper`);
    requireValue(Object.keys(config[wrapper]).join() === 'nugit', `${path}: unexpected server entries`);
    const entry = config[wrapper].nugit;
    requireValue(Object.keys(entry).sort().join() === 'type,url' && entry.type === 'http' && entry.url === ENDPOINT,
      `${path}: use only canonical HTTP URL, without headers, credentials or commands`);
  }
  const toml = await read('examples/codex.toml');
  requireValue(toml.trim() === `[mcp_servers.nugit]\nurl = "${ENDPOINT}"`, 'Codex TOML differs from documented remote config');

  for (const path of files) {
    requireValue(!/(^|\/)(\.env(?:\..*)?|\.mcpregistry.*)$|\.(pem|key)$/i.test(path), `Sensitive file in distribution: ${path}`);
    if (['.json', '.md', '.toml', '.yml', '.svg'].includes(extname(path))) {
      const text = await read(path);
      requireValue(!/-----BEGIN [A-Z ]*PRIVATE KEY-----|(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{20,}/.test(text),
        `Possible credential in ${path}`);
      requireValue(!/\/Users\/|\/home\/[^/]+\//.test(text), `Local user path in ${path}`);
    }
    if (extname(path) === '.svg') {
      const svg = await read(path);
      requireValue(svg.includes('viewBox="0 0 64 64"') && svg.includes('<rect'), `${path}: square background plate required`);
      requireValue(!/<script|<foreignObject|\bon\w+\s*=|(?:href|src)\s*=/i.test(svg), `${path}: active/external SVG content`);
    }
    if (extname(path) !== '.md') continue;
    // Check local inline Markdown links and HTML image sources, excluding examples in fences.
    const prose = (await read(path)).replace(/^```[^\n]*\n[\s\S]*?^```\s*$/gm, '');
    const links = [...prose.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g), ...prose.matchAll(/\bsrc="([^"]+)"/g)];
    for (const [, href] of links) {
      if (/^[a-z][a-z\d+.-]*:/i.test(href) || href.startsWith('#')) continue;
      const local = decodeURIComponent(href.split(/[?#]/)[0]);
      if (!local) continue;
      requireValue(!local.startsWith('/'), `${path}: root-relative repository link ${href}`);
      const destination = resolve(root, dirname(path), local);
      const rel = relative(resolve(root), destination);
      requireValue(rel !== '..' && !rel.startsWith(`..${sep}`), `${path}: link escapes repository: ${href}`);
      try { await stat(destination); } catch { throw new Error(`${path}: broken local link ${href}`); }
    }
  }
  return { files: files.length, manifests: manifests.length, configs: configs.length + 1 };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const result = await validateRepository();
    console.log(`Validated ${result.files} files, ${result.manifests} manifests, ${result.configs} client configs and registry schema.`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
