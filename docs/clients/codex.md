# Codex

Add the hosted service:

```sh
codex mcp add nugit --url https://nugit.ai/mcp
codex mcp login nugit --scopes nugs:write
```

For saving plus optional retrieval, request both scopes and deliberately choose the read collection on NugIt's consent page:

```sh
codex mcp login nugit --scopes nugs:write,nugs:read
```

If you already have a grant, revoke it in [NugIt account settings](https://nugit.ai/account) and use `codex mcp logout nugit` before signing in again. A broader requested scope is not permission until you approve it. You can leave read access off and keep saving alone.

[The TOML example](../../examples/codex.toml) can be merged into the relevant Codex configuration instead of adding the server with the CLI. Do not replace other server entries. CLI options were checked against the locally installed CLI help; complete real-client testing before marking retrieval verified.

This repository also includes a [Codex plugin package](../../plugins/nugit/README.md) for review and distribution. Avoid installing both the direct MCP configuration and the plugin in the same client. No personal marketplace or user configuration is modified by checking out this repository.

Try the [first save and cross-assistant workflow](../workflows.md), then record [verification](../verification-template.md).

References: [official MCP documentation](https://developers.openai.com/codex/mcp) and [CLI reference](https://developers.openai.com/codex/cli/reference). Reviewed 2026-09-18.
