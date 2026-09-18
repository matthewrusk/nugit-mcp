# VS Code and GitHub Copilot

In a VS Code workspace, merge [the configuration example](../../examples/vscode.json) into `.vscode/mcp.json`:

```json
{
  "servers": {
    "nugit": {
      "type": "http",
      "url": "https://nugit.ai/mcp"
    }
  }
}
```

VS Code uses `servers`, not Cursor's `mcpServers`. You can also use **MCP: Add Server** from the Command Palette to add the HTTP URL `https://nugit.ai/mcp` and choose where to store it.

Run **MCP: List Servers**, start `nugit`, and follow authorization. In Copilot's agent tools, enable only the NugIt tools you intend to use. Ask “Save that to NugIt” after a useful answer.

Reading requires separate consent and collection membership; enabling the tool alone does not grant access. Organization policy may need to allow `https://nugit.ai/mcp` and registry ID `io.github.matthewrusk/nugit`.

VS Code and Copilot CLI are distinct clients. For the latter, consult [NugIt's Copilot setup](https://nugit.ai/ai/copilot). A CLI connection configured to allow only `save_nug` must also enable retrieval tools before reading can work, even if OAuth read access was approved.

References: [VS Code MCP configuration](https://code.visualstudio.com/docs/agents/reference/mcp-configuration) and [adding MCP servers](https://code.visualstudio.com/docs/agent-customization/mcp-servers). Reviewed 2026-09-18.
