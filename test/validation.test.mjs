import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, cp, readFile, writeFile, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { ROOT, validateRepository, packagePath } from '../scripts/validate.mjs';

async function fixture(t) {
  const directory = await mkdtemp(join(tmpdir(), 'nugit-validation-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  await cp(ROOT, directory, { recursive: true, filter: path => !/(?:^|\/)(?:node_modules|\.git)(?:\/|$)/.test(path) });
  return directory;
}
async function editJson(directory, path, update) {
  const file = join(directory, path);
  const json = JSON.parse(await readFile(file, 'utf8'));
  update(json);
  await writeFile(file, JSON.stringify(json));
}

test('the distributable repository passes offline validation', async () => {
  const result = await validateRepository();
  assert.equal(result.manifests, 3);
});

for (const [name, file, mutate, expected] of [
  ['HTTP endpoint downgrade', 'examples/cursor.json', x => { x.mcpServers.nugit.url = 'http://nugit.ai/mcp'; }, /canonical HTTP URL/],
  ['inline credential', '.mcp.json', x => { x.mcpServers.nugit.headers = { Authorization: 'Bearer fixture-token' }; }, /without headers/],
  ['local process injection', 'mcp.json', x => { x.mcpServers.nugit.command = 'run-me'; }, /without headers/],
  ['wrong VS Code wrapper', 'examples/vscode.json', x => { x.mcpServers = x.servers; delete x.servers; }, /configuration wrapper/],
  ['duplicate registry identity', 'server.json', x => { x.name = 'io.github.matthewrusk/nugit-mcp'; }, /registry identity/],
  ['registry version drift', 'server.json', x => { x.version = '9.0.0'; }, /version mismatch/],
  ['missing required registry field', 'server.json', x => { delete x.description; }, /Registry schema/],
  ['unusable registry transport', 'server.json', x => { x.remotes[0].type = 'http'; }, /Registry schema/],
  ['missing plugin component', '.cursor-plugin/plugin.json', x => { x.logo = 'assets/missing.svg'; }, /ENOENT/],
  ['escaping manifest asset', '.cursor-plugin/plugin.json', x => { x.logo = '../outside.svg'; }, /Unsafe package reference/],
  ['unexpected install hook', 'package.json', x => { x.scripts.postinstall = 'run-me'; }, /install\/publish hook/],
]) {
  test(`rejects ${name}`, async t => {
    const directory = await fixture(t);
    await editJson(directory, file, mutate);
    await assert.rejects(validateRepository(directory), expected);
  });
}

test('detects broken local documentation links', async t => {
  const directory = await fixture(t);
  await writeFile(join(directory, 'README.md'), '[Setup](docs/nonexistent.md)\n');
  await assert.rejects(validateRepository(directory), /broken local link/);
});

test('does not treat fenced example links as actual documentation links', async t => {
  const directory = await fixture(t);
  await writeFile(join(directory, 'README.md'), '```md\n[Example](not-an-actual-file.md)\n```\n');
  await validateRepository(directory);
});

test('rejects accidentally copied local environment files', async t => {
  const directory = await fixture(t);
  await writeFile(join(directory, '.env.local'), 'EXAMPLE=value\n');
  await assert.rejects(validateRepository(directory), /Sensitive file/);
});

test('rejects symlink escapes even if the target exists', async t => {
  const directory = await fixture(t);
  await symlink(join(ROOT, 'README.md'), join(directory, 'outside.md'));
  await assert.rejects(packagePath(directory, 'outside.md'), /escapes root/);
});

test('rejects active content in logo assets', async t => {
  const directory = await fixture(t);
  await writeFile(join(directory, 'assets/nugit.svg'), '<svg viewBox="0 0 64 64"><rect/><script>alert(1)</script></svg>');
  await assert.rejects(validateRepository(directory), /active\/external SVG/);
});

test('detects an unreviewed change to the vendored schema', async t => {
  const directory = await fixture(t);
  await writeFile(join(directory, 'schemas/mcp-server-2025-12-11.schema.json'), '{}');
  await assert.rejects(validateRepository(directory), /schema hash/);
});
