import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateDiscovery, validateDenial, smoke } from '../scripts/smoke.mjs';

const resource = {
  resource: 'https://nugit.ai/mcp', authorization_servers: ['https://nugit.ai'],
  scopes_supported: ['nugs:write', 'nugs:read'],
};
const oauth = {
  issuer: 'https://nugit.ai', authorization_endpoint: 'https://nugit.ai/oauth/authorize',
  token_endpoint: 'https://nugit.ai/oauth/token', registration_endpoint: 'https://nugit.ai/oauth/register',
  scopes_supported: ['nugs:write', 'nugs:read'], code_challenge_methods_supported: ['S256'],
  grant_types_supported: ['authorization_code', 'refresh_token'], token_endpoint_auth_methods_supported: ['none'],
};
const challenge = 'Bearer resource_metadata="https://nugit.ai/.well-known/oauth-protected-resource"';

test('requires both scope advertisements, PKCE and the correct issuer', () => {
  validateDiscovery(resource, oauth);
  assert.throws(() => validateDiscovery({ ...resource, scopes_supported: ['nugs:write'] }, oauth), /Read scope/);
  assert.throws(() => validateDiscovery(resource, { ...oauth, issuer: 'https://other.example' }), /issuer/);
  assert.throws(() => validateDiscovery(resource, { ...oauth, code_challenge_methods_supported: ['plain'] }), /PKCE/);
  assert.throws(() => validateDiscovery(resource, { ...oauth, token_endpoint: 'https://other.example/token' }), /token_endpoint/);
});

test('requires denial and a usable resource discovery challenge', () => {
  validateDenial(new Response(null, { status: 401, headers: { 'WWW-Authenticate': challenge } }));
  assert.throws(() => validateDenial(new Response(null, { status: 200 })), /must be denied/);
  assert.throws(() => validateDenial(new Response(null, { status: 401 })), /challenge/);
  assert.throws(() => validateDenial(new Response(null, { status: 401, headers: { 'WWW-Authenticate': 'Bearer' } })), /challenge/);
});

test('smoke makes only public discovery and unauthenticated protocol requests', async () => {
  const calls = [];
  const fetcher = async (url, options) => {
    calls.push({ url, options });
    if (url.endsWith('oauth-protected-resource')) return Response.json(resource);
    if (url.endsWith('oauth-authorization-server')) return Response.json(oauth);
    return new Response(null, { status: 401, headers: { 'WWW-Authenticate': challenge } });
  };
  await smoke(fetcher);
  assert.equal(calls.length, 4);
  for (const { url, options } of calls) {
    assert.equal(new URL(url).origin, 'https://nugit.ai');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(new Headers(options.headers).has('authorization'), false);
  }
  assert.deepEqual(calls.filter(x => x.options.body).map(x => JSON.parse(x.options.body).method), ['initialize', 'tools/list']);
});

test('service errors fail the smoke check rather than appearing healthy', async () => {
  await assert.rejects(smoke(async () => new Response(null, { status: 503 })), /unavailable/);
});
