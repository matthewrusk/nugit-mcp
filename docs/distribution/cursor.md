# Cursor submission

After the [real-client checklist](../verification-template.md) passes, publish this repository and submit its root URL at [Cursor Marketplace](https://cursor.com/marketplace/publish).

| Field | Value |
| --- | --- |
| Name | NugIt |
| Repository | https://github.com/matthewrusk/nugit-mcp |
| Website | https://nugit.ai |
| Logotype URL | https://nugit.ai/icon.svg |
| Owner | Matthew Rusk, if submitting under the individual account |
| Description | Save useful AI answers privately. Search and reuse saved Nugs across projects and assistants, with optional read access to a collection you choose. |

The committed square logo has a background plate. The root `.cursor-plugin/plugin.json` points to `mcp.json`; this is one plugin, so a Cursor marketplace manifest is unnecessary. The Codex directory is a separate platform package, not a second Cursor plugin.

Check native installation, desktop/hosted OAuth separately, denied consent, saving, read scope upgrade, selected collection boundaries, refresh, revocation, reconnect, and Cursor source attribution. Include an actual recording only if you have one; the existing illustrative website walkthrough is not live test evidence. No new demo is required by this repository.

Use the [reviewer guide](reviewer-guide.md) and [listing copy](listing-copy.md). Do not advertise “tested with Cursor” until the record exists.

Reference: [Cursor plugin submission and manifest requirements](https://cursor.com/docs/reference/plugins).
