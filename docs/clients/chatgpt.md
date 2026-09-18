# ChatGPT

Use [NugIt's ChatGPT setup](https://nugit.ai/ai/chatgpt) to find the current connection path. If NugIt is available in your ChatGPT app/plugin directory, open its listing and connect your NugIt account. Availability can depend on your account and workspace.

After an answer you want to keep, select NugIt as needed and say “Save that answer to NugIt.” Confirm that the tool returns a private link. Connecting the app alone does not save your conversation.

To retrieve earlier work, your connection and the reviewed tool metadata must support `search_nugs` and `fetch_nug`. Reauthorize with read permission and choose the collection you want ChatGPT to read. Existing save-only grants stay save-only; a repository update cannot upgrade an installed directory integration.

For a private developer test, use the current [official connection and testing guidance](https://developers.openai.com/plugins/deploy/connect-chatgpt) and the remote endpoint `https://nugit.ai/mcp`. Developer access and organization policy may differ from normal directory access. Do not paste credentials into a chat or repository.

Try [reusing a voice guide or lesson outline](../workflows.md). See [OpenAI submission notes](../distribution/openai.md) for maintainers and [compatibility](../compatibility.md) for the evidence recorded here.
