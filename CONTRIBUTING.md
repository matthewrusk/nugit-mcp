# Contributing

Help people save useful work and reuse it safely in another assistant. Good contributions include verified client setup, clearer examples, accessibility improvements, and reproducible compatibility reports.

## Local checks

Use Node.js 20.19 or later:

```sh
npm ci --ignore-scripts
npm run check
```

The suite is offline and needs no NugIt account. `npm run smoke` is a separate opt-in network check. See [testing](docs/testing.md).

Keep changes focused. Preserve each client's configuration format, the canonical endpoint, and registry identity. Match package versions across manifests and `server.json` when releasing metadata. Update [CHANGELOG.md](CHANGELOG.md), relevant guides, and the compatibility record. Do not replace pending live checks with an automated validation result.

Use relative links inside this repository and official primary sources for client-specific instructions, with a review date. Never add runtime shell hooks, automatic saves, credential headers, or local proxies without an explained product need and security review.

For a new client, provide its official remote MCP/OAuth documentation and a completed [verification record](docs/verification-template.md). Do not broaden the hosted callback policy from this repository. This repo cannot implement server permission changes; report them to NugIt support.

## Review and release

Pull requests should explain the user-visible change, checks performed, and limits of verification. Dependencies are development-only, pinned and lockfile-managed. CI has read-only repository access and does not publish integrations.

Before a release, run checks and the public smoke test, complete advertised client checks, review the [submission tracker](docs/distribution/tracker.md), and confirm directory-specific requirements. External publishing remains an explicit maintainer action. Avoid duplicate directory records.

## Community

Be respectful, assume good intent, and provide clear reproduction steps. Do not post private Nugs, tokens, account identifiers, or unredacted OAuth URLs. Send security issues privately as described in [SECURITY.md](SECURITY.md).
