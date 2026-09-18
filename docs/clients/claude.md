# Claude

In Claude's connector settings, use a NugIt listing if available, or add a custom remote connector where your plan and organization permit it. Name it **NugIt** and enter:

```text
https://nugit.ai/mcp
```

If the dialog offers an OAuth client choice, use **Register automatically** (dynamic client registration). NugIt advertises a registration endpoint; support for Claude’s published client identity is not established here. Choose sign-in authentication, not a fixed token header.

Complete the browser sign-in to NugIt and review permissions. No manually pasted bearer token or local bridge is needed for this hosted connection. In a conversation, enable the connector and say “Save that to NugIt” after an answer you want to keep.

To reuse saved work, authorize reading of a selected collection and add the relevant Nugs to it in NugIt. Ask “Find my saved lesson outline, read it, and adapt it for beginners. Cite the original Nug.” Prefer a distinctive literal keyword if search misses.

If the client requests only saving, it cannot read existing Nugs. Follow [reconnection guidance](../troubleshooting.md). Connecting a custom connector and appearing in Claude's public directory are separate processes; this repository does not claim directory approval.

References: [remote connectors](https://claude.com/docs/connectors/custom/remote-mcp) and [directory submission requirements](https://claude.com/docs/connectors/building/submission). Reviewed 2026-09-18.
