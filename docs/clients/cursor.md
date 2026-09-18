# Cursor

**Preview:** package and configuration validation are automated. A completed live Cursor authorization and retrieval session has not been recorded for this release.

1. Open the [NugIt Cursor setup page](https://nugit.ai/ai/cursor) and choose its installation link. It contains only the public MCP endpoint, not credentials.
2. In Cursor's MCP settings, enable `nugit` and follow the browser authorization prompt.
3. Sign in to NugIt. Choose save-only access, or explicitly approve read access to one manual collection or your library if Cursor requests it.
4. Ask for a useful answer, then say “Save that to NugIt.” Open the returned private link and confirm the content.

The repository's root `.cursor-plugin/plugin.json` and `mcp.json` also package this connection for Cursor Marketplace submission. A package in this repository is not evidence that the Marketplace has approved it.

## Manual configuration

Merge [this example](../../examples/cursor.json) into `~/.cursor/mcp.json` for personal use, or `.cursor/mcp.json` for a project. Preserve any existing servers. Use one installation method to avoid duplicate tools.

```json
{
  "mcpServers": {
    "nugit": {
      "type": "http",
      "url": "https://nugit.ai/mcp"
    }
  }
}
```

The plugin does not need an API key, secret header, local process, or install script.

## First retrieval

Add a test Nug to the collection you approved in NugIt. Ask “Search NugIt for brand voice, read the matching Nug, and use it to draft a short announcement. Cite the original Nug.” Search is literal; try a few words that actually appear in the Nug.

If reading is not authorized, reconnect and request read access. If Cursor never presents read consent, follow [retrieval troubleshooting](../troubleshooting.md); changing this configuration cannot grant read permission. Keep saving enabled if you want both actions.

## Reconnection and reviewer checks

Revoke the old connection in [NugIt account settings](https://nugit.ai/account), reconnect in Cursor, and approve the intended collection again. Changing the selected collection requires fresh authorization. Confirm saved Nugs show Cursor as the source; treat a different label as a compatibility issue.

Desktop and hosted agents need separate tests. Record the Cursor version, OS, installation method, OAuth callback, source label, reconnect result, and collection boundary results using the [verification checklist](../verification-template.md).

References: [Cursor MCP](https://cursor.com/docs/mcp), [installation links](https://cursor.com/docs/mcp/install-links), [plugin format and submission](https://cursor.com/docs/reference/plugins). Reviewed 2026-09-18.
