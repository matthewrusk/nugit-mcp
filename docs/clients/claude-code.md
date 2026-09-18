# Claude Code

Add NugIt to your personal configuration:

```sh
claude mcp add --transport http --scope user nugit https://nugit.ai/mcp
```

Open Claude Code, use `/mcp`, choose `nugit`, and complete OAuth in the browser. Review permissions in NugIt. Use “Save that to NugIt” after the answer you want to preserve.

For project configuration, merge [the JSON example](../../examples/claude-code.json) into `.mcp.json`. The `type: http` field is required by Claude Code. Preserve other servers and choose either direct configuration or the plugin, not both.

## Local plugin review

The root `.claude-plugin/plugin.json` references the root `.mcp.json`. With a current Claude Code CLI, validate from this repository:

```sh
claude plugin validate .
claude --plugin-dir .
```

These commands load a local plugin; they do not publish it to a marketplace. Native plugin loading remains a manual release check when the CLI is unavailable in CI.

For retrieval, approve read access and add the test Nug to the approved collection. If authorization is missing, reconnect as described in [troubleshooting](../troubleshooting.md). Use [the verification checklist](../verification-template.md) before claiming end-to-end compatibility.

References: [MCP setup](https://code.claude.com/docs/en/mcp) and [plugin reference](https://code.claude.com/docs/en/plugins-reference). Reviewed 2026-09-18.
