# NugIt for Codex

This directory is the standalone Codex plugin root. It contains `.codex-plugin/plugin.json`, `.mcp.json`, and the referenced logo. Include all three when packaging it for a review portal; hidden files matter.

It connects to `https://nugit.ai/mcp` using OAuth. It adds no shell hooks or local executable. Saving requires `nugs:write`; reading requires explicit `nugs:read` consent and an approved collection or library.

For direct setup, use the [Codex guide](../../docs/clients/codex.md). See [OpenAI distribution](../../docs/distribution/openai.md) for the distinct public review process. This package does not imply an OpenAI Marketplace listing or modify the existing ChatGPT listing.
