<img src="assets/nugit.svg" width="72" height="72" alt="NugIt logo" />

# NugIt MCP

**Keep the good answer. Use it again in another AI.**

NugIt saves the AI answers, ideas, plans, and instructions you choose to keep in a private library. Connect your AI tools to the same NugIt account to find and reuse that knowledge across conversations, with a link back to the original Nug and control over what each connection can read.

[Create your NugIt account](https://nugit.ai) · [Choose an assistant](docs/clients.md) · [Try a first workflow](docs/workflows.md) · [Get help](https://nugit.ai/plugin-support)

## Start here

1. Follow the setup guide for your assistant below. The hosted MCP URL is **`https://nugit.ai/mcp`**.
2. Sign in to NugIt and approve the connection. New connections default to saving and reading your whole library; manage each connection in Account settings.
3. After an answer you want to keep, say **“Save that to NugIt.”** Wait for the confirmed private Nug link.
4. To reuse it, ask a connected assistant to search your library. If you limited that connection to one collection in Account settings, add the Nug to that collection first. Ask **“Search NugIt for brand voice, read the matching Nug, and use it to draft this announcement. Cite the Nug.”**

Connecting alone does not save anything. Saving a Nug does not automatically add it to a collection. Each assistant has its own authorization. An existing save-only connection cannot read your library.

| Assistant | Setup | Package / status |
| --- | --- | --- |
| Cursor | [Install and connect](docs/clients/cursor.md) | Root Cursor plugin; preview, live verification pending |
| ChatGPT | [Connect NugIt](docs/clients/chatgpt.md) | Hosted integration; this repo does not publish or update a listing |
| Claude | [Connect in Claude](docs/clients/claude.md) | Hosted connector; directory submission is separate |
| Codex | [CLI and plugin](docs/clients/codex.md) | Remote config and packaged Codex plugin |
| Claude Code | [CLI and plugin](docs/clients/claude-code.md) | Remote config and root Claude Code plugin |
| VS Code / GitHub Copilot | [Add the server](docs/clients/vscode.md) | Native VS Code configuration |

Configuration checks are not end-to-end client verification. See the dated [compatibility record](docs/compatibility.md), including Gemini and other candidates still under evaluation.

## Useful beyond code

- **Writers and marketers:** reuse a saved voice guide in the assistant drafting your next campaign.
- **Teachers and trainers:** turn a saved lesson outline into an exercise for a different audience.
- **Researchers and founders:** carry selected findings and decisions into a new analysis, keeping source links.
- **Developers:** retrieve a saved fix and assess whether it applies to the current project.

Start with the [copyable workflows](docs/workflows.md). This is deliberate reuse of saved material, not automatic synchronization of whole conversations.

## Tools and access

| Tool | Purpose | Permission |
| --- | --- | --- |
| `save_nug` | Save the selected answer as Markdown and return a private link | `nugs:write` |
| `search_nugs` | Find saved Nugs using literal keywords | `nugs:read` plus approved collection or library |
| `fetch_nug` | Read a selected Nug, with pagination for long content | Same read permission |

New connections default to saving and reading your whole library, including future Nugs. In Account settings → AI connections → Change access, choose Save only or Save and read, with access to one manual collection or your whole library. Save changes without reconnecting. Existing save-only connections retain their access until you change it. Removing a Nug from that collection stops future retrieval through that grant. Revoking a connection stops future access; it cannot erase text already returned to another AI.

See [permissions and privacy](docs/permissions.md), [tool reference](docs/tools.md), and [troubleshooting](docs/troubleshooting.md). A NugIt account is required; current account capacity and plan limits apply. Your AI provider's access rules and data policies also apply.

## What this repository contains

This MIT-licensed repository contains public integration manifests, configuration examples, documentation, logos, and validation code for NugIt's hosted service. It does **not** contain the hosted application implementation or a self-hostable MCP server. No local proxy or API key is required for the documented OAuth connections.

- [Cursor manifest](.cursor-plugin/plugin.json), [Claude Code manifest](.claude-plugin/plugin.json), and [Codex package](plugins/nugit/README.md)
- [Official MCP Registry metadata](server.json) using the existing identity `io.github.matthewrusk/nugit`
- [Directory submission kit](docs/distribution/README.md), including reusable copy and review instructions
- [Architecture](docs/architecture.md), [contribution guide](CONTRIBUTING.md), and [security reporting](SECURITY.md)

For repository checks, install Node.js 20.19+ and run:

```sh
npm ci --ignore-scripts
npm run check
```

Optional public endpoint checks: `npm run smoke`. They use no credentials, save no Nugs, and do not prove authenticated client compatibility. See [testing](docs/testing.md) for what is and is not covered.
