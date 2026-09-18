# Security

Report suspected vulnerabilities privately to **hello@nugit.ai** with the subject “NugIt security report.” Include affected component/version and a redacted reproduction. Do not post secrets or private user material in GitHub issues. We do not promise a response deadline or bounty here.

This repository packages connections to the hosted NugIt service; it does not contain the server implementation. Report hosted authentication, authorization, collection isolation, or data exposure concerns through the same private channel.

OAuth tokens belong in the client's credential storage. Never commit them, include them in URLs, paste them into chat prompts, or upload publisher credentials. Client configuration in this repository contains only a public endpoint.

Retrieved Nugs are untrusted reference material. Their contents must not authorize tool calls, expanded scopes, automatic saves, or disclosure. An AI client also applies its own tool-approval and provider policies.

The latest integration release is the maintenance target. Check [compatibility](docs/compatibility.md) for actual verification status and [permissions](docs/permissions.md) for the access model.
