# Community directories

## Glama and Awesome Remote MCP Servers

NugIt is a hosted OAuth service. Use [Glama's remote connector directory](https://glama.ai/mcp/connectors) and [Awesome Remote MCP Servers](https://github.com/punkpeye/awesome-remote-mcp-servers), rather than representing this repo as a locally runnable server.

The remote list's current contribution rules require a working public endpoint and an existing Glama connector badge. First search for NugIt; create or update the Glama entry with the canonical endpoint and [listing copy](listing-copy.md). Copy the assigned connector URL and badge exactly. Do not invent a Glama identifier or badge for a nonexistent listing.

**Handshake dependency:** NugIt requires OAuth even for MCP initialization. The directory says it checks initialization. Confirm its checker accepts the OAuth flow/challenge before submitting; the public smoke check's expected 401 is not a passed MCP handshake. Do not weaken authentication to satisfy a directory scanner.

Once the real Glama connector exists, the entry belongs alphabetically under **Knowledge & Memory**. Its description can be:

> Save AI answers privately and reuse selected Nugs across assistants with explicit read permission.

The entry uses the product homepage, endpoint `https://nugit.ai/mcp`, the verified Glama badge, and the OAuth marker. A complete entry must be assembled with the real badge before opening a PR.

Suggested PR title: **Add NugIt to Knowledge & Memory**

Suggested PR body:

> NugIt is a hosted OAuth MCP service for saving selected AI answers and optionally searching and retrieving saved Nugs. It supports explicit read access to one collection or the user's library. Setup, permission documentation, and reviewer instructions are available in the public nugit-mcp repository. Endpoint and Glama evidence are included in the entry.

Before submitting, replace that evidence statement with actual completed checks. Follow the directory's current ordering and contribution rules; publication requires a separate contribution to that repository. Maintainers may request account-level actions such as starring; this project does not automate them.

Reference: [current contribution requirements](https://github.com/punkpeye/awesome-remote-mcp-servers/blob/main/CONTRIBUTING.md).

## PulseMCP

Search [PulseMCP](https://www.pulsemcp.com/servers) for NugIt before creating a duplicate. Use its [submission form](https://www.pulsemcp.com/submit) with the hosted endpoint, public repository, product website, OAuth description and reviewer guide. Record the actual result in [the tracker](tracker.md). Inclusion is subject to its review and is not implied by an MCP Registry record.

## Other GitHub lists

Check that each list accepts hosted authenticated services and that NugIt is not already listed. Use factual descriptions and genuine compatibility evidence. Avoid submitting this configuration repository to lists requiring an open-source server implementation.
