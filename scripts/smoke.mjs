import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ORIGIN = 'https://nugit.ai';
const RESOURCE = `${ORIGIN}/.well-known/oauth-protected-resource`;

export function validateDiscovery(resource, oauth) {
  assert.equal(resource.resource, `${ORIGIN}/mcp`, 'Wrong protected resource');
  assert.deepEqual(resource.authorization_servers, [ORIGIN], 'Unexpected authorization server');
  for (const document of [resource, oauth]) {
    assert.ok(document.scopes_supported?.includes('nugs:write'), 'Write scope is missing');
    assert.ok(document.scopes_supported?.includes('nugs:read'), 'Read scope is missing');
  }
  assert.equal(oauth.issuer, ORIGIN, 'Unexpected OAuth issuer');
  for (const [field, path] of Object.entries({ authorization_endpoint: '/oauth/authorize', token_endpoint: '/oauth/token', registration_endpoint: '/oauth/register' })) {
    assert.equal(oauth[field], `${ORIGIN}${path}`, `Unexpected ${field}`);
  }
  assert.ok(oauth.code_challenge_methods_supported?.includes('S256'), 'PKCE S256 is missing');
  assert.ok(oauth.grant_types_supported?.includes('authorization_code'), 'Authorization code grant is missing');
  assert.ok(oauth.grant_types_supported?.includes('refresh_token'), 'Refresh grant is missing');
  assert.ok(oauth.token_endpoint_auth_methods_supported?.includes('none'), 'Public OAuth clients are unsupported');
}

export function validateDenial(response) {
  assert.equal(response.status, 401, 'Unauthenticated MCP request must be denied');
  const challenge = response.headers.get('www-authenticate') ?? '';
  assert.match(challenge, /^Bearer\s/i, 'OAuth bearer challenge is missing');
  assert.ok(challenge.includes(`resource_metadata="${RESOURCE}"`), 'Canonical resource metadata is missing from challenge');
}

/** Public requests only: never registers clients, authenticates, saves, or reads private Nugs. */
export async function smoke(fetcher = fetch) {
  const request = async (url, options = {}) => {
    const response = await fetcher(url, { ...options, redirect: 'error', signal: AbortSignal.timeout(15_000) });
    return response;
  };
  const documents = await Promise.all([RESOURCE, `${ORIGIN}/.well-known/oauth-authorization-server`].map(async url => {
    const response = await request(url);
    assert.equal(response.status, 200, 'Discovery endpoint unavailable');
    assert.match(response.headers.get('content-type') ?? '', /application\/json/i, 'Discovery must return JSON');
    return response.json();
  }));
  validateDiscovery(...documents);
  const envelopes = [
    { jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'nugit-public-smoke', version: '0.2.0' } } },
    { jsonrpc: '2.0', id: 2, method: 'tools/list' },
  ];
  for (const envelope of envelopes) {
    const response = await request(`${ORIGIN}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json, text/event-stream' },
      body: JSON.stringify(envelope),
    });
    try { validateDenial(response); } finally { await response.body?.cancel(); }
  }
  return 'Public OAuth discovery and unauthenticated MCP denial passed. Authenticated client testing remains separate.';
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { console.log(await smoke()); }
  catch (error) { console.error(`Public smoke check failed: ${error.message}`); process.exitCode = 1; }
}
