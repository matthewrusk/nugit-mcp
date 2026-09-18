# Official MCP Registry

Use **`io.github.matthewrusk/nugit`**, the identity already used by the application and existing listing. The public repo name `nugit-mcp` does not require a new registry name.

A public lookup on 2026-09-18 found active version **0.1.0**, pointing at the earlier application repository. This repository prepares **0.2.0**, with the public repository URL and optional retrieval description. Check the current listing immediately before publishing; choose a new unused version if another release has appeared.

The root [server.json](../../server.json) uses a `streamable-http` remote. NugIt is hosted, so there is no npm package or local runtime to publish.

## Validate, then publish

1. Run `npm ci --ignore-scripts` and `npm run check`.
2. Run `npm run smoke` and complete authenticated verification for advertised capabilities.
3. Install or update the official `mcp-publisher` CLI following its documentation. Review the current help/version and validate the file.
4. Authenticate as the GitHub owner of the namespace, review the metadata, then publish deliberately:

```sh
mcp-publisher validate
mcp-publisher login github
mcp-publisher publish
```

If an older CLI prints `Unknown command: validate`, update it or use the documented validation-only endpoint before publishing:

```sh
curl --fail-with-body 'https://registry.modelcontextprotocol.io/v0.1/validate' \
  --header 'Content-Type: application/json' --data-binary @server.json
```

This sends only public listing metadata and does not publish it.

5. Verify the new record:

```sh
curl --fail --get 'https://registry.modelcontextprotocol.io/v0.1/servers' \
  --data-urlencode 'search=io.github.matthewrusk/nugit'
```

Check exact identity, version, repository URL, and remote URL in the response. Keep publisher credentials local and outside version control. CI validates but never publishes.

Official publishing is not a PR to `data/seed.json`. Registry publication also does not guarantee a curated GitHub, Cursor, Claude, or OpenAI listing. Those services have independent discovery/review policies.

References: [remote server metadata](https://modelcontextprotocol.io/registry/remote-servers), [publishing quickstart](https://modelcontextprotocol.io/registry/quickstart), [registry contribution policy](https://github.com/modelcontextprotocol/registry/blob/main/CONTRIBUTING.md).
