# Public package verification — 2026-09-18

Release under preparation: **0.2.0**. No directory publication or authenticated client session was performed as part of these checks.

| Check | Result |
| --- | --- |
| Offline package validation | Passed: three plugin manifests, seven client configurations, official registry JSON Schema, component paths and local documentation links |
| Node.js 20.19.6 | 22 tests passed |
| Node.js 22.23.2 | 22 tests passed |
| Codex plugin validator | Passed for `plugins/nugit` |
| Development dependency audit | No known vulnerabilities reported at check time |
| Official registry `POST /v0.1/validate` | HTTP 200, `valid: true`, empty `issues` |
| Public OAuth metadata | Both scopes, expected issuer/endpoints, PKCE S256 and refresh advertised |
| Unauthenticated initialize and tools/list | HTTP 401 with canonical protected-resource discovery challenge |
| Registry lookup | Existing active 0.1.0 entry found under `io.github.matthewrusk/nugit` |
| Native Cursor / Claude Code package load | Pending |
| Authenticated save/read/refresh/revoke and source attribution | Pending per client |
| GitHub-hosted CI run | Pending repository push; workflow checks executed locally |

The installed `mcp-publisher` binary listed `validate` in help but rejected the command, so the official validation-only HTTP endpoint was used. No credentials were supplied and no record was published.

Reproduce local and public checks with [the testing guide](../testing.md). Use the [real-client template](../verification-template.md) for the remaining tests. These results do not establish that another client can authenticate or that a directory has accepted a submission.
