# Troubleshooting

| Symptom | Next step |
| --- | --- |
| Can save, cannot read | Existing save-only connections need fresh `nugs:read` consent. Choose a collection or library; keep write permission if needed. |
| No read option on consent page | The client did not request `nugs:read`. Use its scope configuration or upgrade prompt. Codex has an explicit scopes command in its guide. Do not add undocumented OAuth fields to another client's JSON. |
| A saved Nug is not found | Add it to the approved manual collection, check the account, and use one or two literal keywords. Saving does not add collection membership. |
| Known Nug ID is unavailable | It may be outside approved access, removed, or deleted. Inaccessible and nonexistent IDs intentionally look the same. |
| Tools appear twice | Keep either the plugin installation or direct MCP configuration in that client. |
| OAuth redirect rejected | Report the client version and callback origin/path privately to support. Do not work around it by disabling redirect validation or sharing a token. |
| Lost connection | Check provider service status, then reauthenticate through the client. Revoke old connections in NugIt when replacing authorization. |
| Wrong source label | Include client/version and installation path in a compatibility report. Public-client attribution is a label, not proof of identity. |
| No tool call happened | Enable NugIt in the current conversation and ask explicitly to save or retrieve. Plain assistant text is not a confirmed save. |
| Whole answer not returned | Ask the assistant to follow `nextOffset` when it needs the remaining pages. |

To change which collection a client can read, revoke its grant at [Account](https://nugit.ai/account), reconnect from the client, and approve the new selection. Removing local configuration alone should not be treated as server-side revocation.

For help: [NugIt support](https://nugit.ai/plugin-support) or hello@nugit.ai. Report client name/version, OS, approximate time, and a redacted error. Do not post private Nug content, account details, callback query strings, authorization codes, or tokens in public issues.
