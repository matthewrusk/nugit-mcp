# Troubleshooting

| Symptom | Next step |
| --- | --- |
| Can save, cannot read | In Account settings → AI connections → Change access, choose Save and read and select a collection or your library. Save access; no reconnect is needed. |
| No read option on consent page | The new connection screen no longer asks you to choose reading access. Manage save-only, collection, or library access in NugIt Account settings. |
| A saved Nug is not found | If access is collection-restricted, add it to that manual collection. Check the account and use one or two literal keywords. Saving does not add collection membership. |
| Known Nug ID is unavailable | It may be outside approved access, removed, or deleted. Inaccessible and nonexistent IDs intentionally look the same. |
| Tools appear twice | Keep either the plugin installation or direct MCP configuration in that client. |
| OAuth redirect rejected | Report the client version and callback origin/path privately to support. Do not work around it by disabling redirect validation or sharing a token. |
| Lost connection | Check provider service status, then reauthenticate through the client. Revoke old connections in NugIt when replacing authorization. |
| Wrong source label | Include client/version and installation path in a compatibility report. Public-client attribution is a label, not proof of identity. |
| No tool call happened | Enable NugIt in the current conversation and ask explicitly to save or retrieve. Plain assistant text is not a confirmed save. |
| Whole answer not returned | Ask the assistant to follow `nextOffset` when it needs the remaining pages. |

To change which collection a client can read, use **Change access** at [Account](https://nugit.ai/account), choose the new collection, and **Save access** without reconnecting. Removing local configuration alone should not be treated as server-side revocation.

For help: [NugIt support](https://nugit.ai/plugin-support) or hello@nugit.ai. Report client name/version, OS, approximate time, and a redacted error. Do not post private Nug content, account details, callback query strings, authorization codes, or tokens in public issues.
