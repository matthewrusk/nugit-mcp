# Distribution and growth

This is the submission kit for one hosted service, not a promise of automatic distribution to every AI. Last researched 2026-09-18.

| Priority | Destination | Why | Next action |
| --- | --- | --- | --- |
| 1 | [Cursor Marketplace](cursor.md) | Users can keep a solved problem and reuse it in another project | Complete real-client verification; submit public root plugin |
| 1 | [Official MCP Registry](registry.md) | Shared discovery metadata for the MCP ecosystem | Update existing identity/version and public repository URL |
| 1 | [Existing ChatGPT / OpenAI presence](openai.md) | Existing users can adopt cross-assistant retrieval | Review published tools and consent; use the current review flow for updates/new plugin packaging |
| 2 | [Claude Connectors Directory](claude.md) | Writing, education, research and business workflows | Validate real connector and account eligibility; submit review kit |
| 2 | [Glama + remote community list](community.md) | Discoverable hosted connector and GitHub directory | Obtain Glama listing; resolve authenticated-handshake requirement; then PR |
| 2 | [PulseMCP](community.md) | Additional MCP discovery | Search for existing NugIt entry, then submit or request update |
| 3 | [Gemini and other candidates](../compatibility.md) | Broader consumer reach | Verify callback, eligibility and actual activation before promotion |

These are priorities based on product fit and existing distribution, not measured traffic forecasts. Don't create a local proxy, npm runtime, desktop extension, or separate backend just to qualify for more directories.

## Measure useful adoption

The user outcome is a successful reuse in a second assistant. For each channel, track setup visits, completed authorization, first confirmed save, first successful retrieval, second-assistant activation, and return use. Use existing consent-aware product analytics and aggregate counts; never put Nug content, search text, tokens or private URLs into campaign parameters or analytics.

Use landing-page campaign tags if the product supports them, but leave the MCP endpoint and OAuth redirect URLs canonical. Compare activated users and useful repeat retrieval, not listing count or stars. Prioritize the next client from user requests and where this funnel fails.

## Review materials

- [Reusable listing copy](listing-copy.md)
- [Reviewer guide](reviewer-guide.md)
- [Permissions](../permissions.md) and [tool contracts](../tools.md)
- [Verification checklist](../verification-template.md) and [current evidence](../compatibility.md)

Publish only accurate compatibility claims. Record directory URLs, submission dates, versions and review results in [the submission tracker](tracker.md); a prepared manifest is not a published listing.
