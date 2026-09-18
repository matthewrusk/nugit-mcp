# Compatibility and evidence

Last reviewed: **2026-09-18**. [Recorded package and public endpoint checks](verification/2026-09-18-public-checks.md). Documentation and configuration support are distinct from a recorded real-client test.

| Surface | Evidence available | Remaining release check |
| --- | --- | --- |
| Hosted OAuth discovery | Public metadata advertises both scopes, PKCE S256, and refresh | Authenticated end-to-end client sessions |
| Official MCP Registry | Existing active `io.github.matthewrusk/nugit`, version 0.1.0, observed 2026-09-18 | Publish updated metadata/version pointing to this repository |
| Cursor | Current-format plugin/config; application has desktop/hosted OAuth and source-attribution tests | Native package load, live OAuth, save/read, source label, refresh/revoke on each surface |
| ChatGPT | Existing product integration and guide | Verify current reviewed listing exposes retrieval and record fresh consent test |
| Claude web | Hosted connector configuration and callback support in application | Live session and directory review status |
| Codex | CLI commands checked against local help; package validation | Live plugin installation, save/read, reconnect |
| Claude Code | Documented HTTP config and plugin format | Native plugin validation/load and live authorization |
| VS Code / Copilot | Client-specific HTTP configuration and existing app callback support | Live save/read/reconnect with current VS Code |
| Gemini consumer app | Google documents custom remote MCP for eligible accounts | Callback acceptance, tool support, consent and live test; not claimed supported |
| Perplexity, OpenCode, Windsurf | Candidates for demand-led evaluation | Verify current requirements and server callback acceptance before shipping setup claims |

The application's internal server tests are useful evidence of permission handling, but they are not included here and do not prove any client completed OAuth. Public repository CI checks packaging and validation tooling only. The public smoke check tests discovery and unauthenticated denial without accessing an account.

Gemini custom apps currently require a US adult personal account and Keep Activity enabled; this is separate from Gemini CLI or Antigravity. Eligibility does not prove NugIt compatibility. [Google's current requirements](https://support.google.com/gemini/answer/17209137?co=GENIE.Platform%3DDesktop&hl=en-GA).

Record completed checks with the [verification template](verification-template.md). Never replace pending with passed based only on documentation, a healthy endpoint, or a successful local schema check.
