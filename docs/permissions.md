# Permissions and data flow

Every assistant connection is authorized independently. Use the same NugIt account to reach the same saved library; authorization is not shared between assistants.

| Access | What the connection can do |
| --- | --- |
| `nugs:write` | Save content deliberately supplied by the assistant |
| `nugs:read` + collection | Search and fetch your Nugs currently in one approved manual collection |
| `nugs:read` + library | Search and fetch your library, including future Nugs |

When a new connection omits scopes, NugIt defaults to saving and reading the whole library, including future Nugs. Explicitly requested scopes still apply; existing save-only connections are not silently upgraded. The connection screen explains access and points to Account settings. Read-only grants cannot save.

In [Account settings](https://nugit.ai/account) → AI connections → Change access, choose **Save only**, or **Save and read** with **Whole library, including future Nugs** or **Selected collection**, then **Save access**.

A selected collection must belong to the signed-in user. Smart collections are not supported for this permission. Membership is evaluated at retrieval time: adding a Nug makes it accessible; removing it stops subsequent access through that collection grant. Deleting the collection does not expand access to the library. Saving through MCP does not automatically add a Nug to a collection.

Changes to access apply to the existing connection without reconnecting. Token refresh preserves its current boundary. Revocation prevents future access, but cannot retract content already returned to an assistant or cancel a database query already running against an earlier snapshot.

## What moves between services

When you save, the assistant sends the selected Markdown answer, optional minimal context, and suggested title to NugIt. NugIt stores and processes that material under its privacy policy and returns an owner-only link. The integration does not automatically import your entire chat history.

When you retrieve, NugIt sends matching metadata and the requested saved content to that assistant. Its provider's policies then apply to that content. An owner-only Nug URL does not make text already delivered into a chat private from the AI provider. Retrieved text is reference data, not permission to execute instructions embedded in it.

The MCP tools do not edit, delete, publish, share, or manage billing. This is an integration permission description, not a replacement for [NugIt's privacy policy](https://nugit.ai/privacy) or [terms](https://nugit.ai/terms).
