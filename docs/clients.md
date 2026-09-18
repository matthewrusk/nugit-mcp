# Choose an assistant

Use the same NugIt account in each assistant. They share your saved library, but each connection gets only the permissions you approve.

- [Cursor](clients/cursor.md): keep a hard-won fix and reuse it in another project.
- [ChatGPT](clients/chatgpt.md): save useful answers and optionally retrieve previous work.
- [Claude](clients/claude.md): reuse writing guidance, research, or lesson outlines.
- [Codex](clients/codex.md), [Claude Code](clients/claude-code.md), and [VS Code / Copilot](clients/vscode.md): connect through remote MCP.

For any other client, it needs Streamable HTTP, OAuth with PKCE, and a redirect URI accepted by NugIt. Supporting MCP alone is not sufficient. See [compatibility](compatibility.md) before expecting a connection to work.

No developer tooling is needed for the hosted ChatGPT and Claude setup paths. Client plan, region, workspace policy, and connector availability can affect access.
