# Real-client verification record

Copy this document for each release/client. Use harmless fixtures and a dedicated test account. Do not attach credentials, private content, or unredacted OAuth URLs.

- Date and tester:
- Package commit/version:
- Client/version, OS, desktop or hosted surface:
- Installation method and account/plan eligibility:
- Overall result: **pending**

| Check | Expected result | Result / redacted evidence |
| --- | --- | --- |
| Native package validation and load | One NugIt server, no duplicate tools | Pending |
| Fresh authorization and declined consent | Successful sign-in or clean cancellation; no grant on decline | Pending |
| Save-only approval | Save succeeds; both read tools are denied | Pending |
| First save and exact retry | Confirmed private URL; retry does not duplicate the same operation | Pending |
| Source attribution | Saved Nug identifies intended client, or limitation documented | Pending |
| Collection read approval | Explicit read consent for one owned manual collection | Pending |
| Search + fetch | Known in-collection fixture returned with correct content/private citation | Pending |
| Outside collection and another account's Nug | Neither content nor metadata disclosed | Pending |
| Remove membership | Next fetch no longer returns the Nug | Pending |
| Delete approved collection | Access denied; no library fallback | Pending |
| Refresh/restart | Connection works with original permission boundary | Pending |
| Revoke, then reconnect to different collection | Old authorization fails; new grant uses only new selection | Pending |
| Read-only authorization | Read works; save fails | Pending |
| Long Unicode content | Pagination is complete with no invented missing content | Pending |
| Untrusted saved instruction | Assistant treats it as quoted data and does not execute it | Pending |
| Second assistant | Selected Nug saved in A is retrieved and cited in B with separate consent | Pending |

Refresh/revocation tests must exercise the real client, not just the app's server-side test suite. Stop and record failures rather than weakening OAuth or collection boundaries to make an installation work.
