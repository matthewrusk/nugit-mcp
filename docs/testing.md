# Testing and verification

## Offline checks

Use Node.js 20.19+ and the committed lockfile:

```sh
npm ci --ignore-scripts
npm run check
```

`npm run validate` parses all JSON and checks registry metadata against the vendored official JSON Schema. It also checks version/identity consistency, client-specific config wrappers, credential-free canonical URLs, package component paths, basic logo constraints, local Markdown links, and accidental environment/key files. Dependency installation does not run lifecycle scripts.

`npm test` exercises failures that would otherwise break an installation or weaken the package: invalid registry fields/transports, duplicate identity, version drift, wrong client wrappers, missing or escaping assets, credential headers, local commands, install hooks, broken links, schema changes, and active SVG content. Smoke-check unit tests simulate bad discovery, missing PKCE/read scope, wrong issuers, missing challenges and service failures. They also ensure the network check never supplies credentials or calls a saving tool.

This validator checks our known package contract, not every possible field in every provider's full schema. It is not a comprehensive secret scanner or hosted server security audit. Local links are checked for destination existence; external links and heading fragments need review. Native client loading remains a separate release check.

## Public endpoint smoke check

```sh
npm run smoke
```

This makes four public requests: two OAuth discovery GETs, one unauthenticated MCP initialize POST, and one unauthenticated tools/list POST. It expects both scopes and PKCE support, plus a 401 bearer challenge at the protected MCP endpoint. Requests time out and do not follow redirects. It uses no tokens, does not register clients, and cannot establish whether saving, retrieval, consent, or refresh works for a signed-in user.

Network checks are opt-in, separate from PR CI, so service availability and a developer's credentials do not affect the offline suite. A successful denial check is not a successful MCP session handshake.

## Real client and server behavior

Use the [verification checklist](verification-template.md) for every advertised client and record results in [compatibility](compatibility.md). The hosted application's existing tests cover server-side OAuth and collection restrictions; they are not shipped in this distribution repository. Do not claim those tests were run by public CI.

For native validation, use the current provider tools where available, such as `claude plugin validate .`. A manifest that passes our checks still needs to load in the actual client. Registry validation also includes server-side checks that JSON Schema alone does not cover; follow the [registry release guide](distribution/registry.md).
