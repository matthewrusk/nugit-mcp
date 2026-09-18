# ChatGPT and Codex distribution

NugIt already has a product integration path for ChatGPT. Verify its current published tools before changing its listing: older reviewed metadata or grants may expose saving only. Repository files do not update a hosted listing or grant existing users read access.

The current [OpenAI submission guidance](https://developers.openai.com/plugins/deploy/submission) supports remote MCP-backed plugins. It requires the actual server endpoint for review, not just a reference to an already-published integration. Use the current portal workflow for the intended new plugin or existing listing update; do not create duplicate public listings merely because the repository changed.

Submit the hosted endpoint `https://nugit.ai/mcp`, factual permission descriptions, starter prompts from [the listing kit](listing-copy.md), and [reviewer test cases](reviewer-guide.md). The Codex manifest and assets are in [plugins/nugit](../../plugins/nugit/README.md); include hidden files if packaging that directory. This is not a claim that one uploaded package automatically reaches both products.

Before submission, verify developer identity, organization submission access, current review requirements, OAuth callbacks, live tool annotations, privacy/terms, permitted countries, and actual save/read behavior. Use private reviewer credentials only in the review portal. The current docs call the relevant access permission Apps Management and require submission write access.

Prioritize a clear optional-retrieval upgrade for existing users: keep save-only access valid, explain collection selection, and teach a first second-assistant reuse. Avoid changing the promise from “cannot read” to “can read” without explicit consent and updated reviewed metadata.

References: [submit plugins](https://developers.openai.com/plugins/deploy/submission), [build plugins](https://developers.openai.com/plugins/build/plugins). Reviewed 2026-09-18.
