import { getFeed } from './getFeed';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';

test('getFeed -> get -> /feeds/1 (without x-user in header) (error 500)', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' } });
  const result = await getFeed(request, response);
  assert.equal(500, response.statusCode);
});

test('getFeed -> get -> /feeds/1', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' }, headers: { 'x-user': 'user' } });
  const result = await getFeed(request, response);
  const json = response._getJSONData();
  assert.equal(200, response.statusCode);
  assert.equal('success', json.status);
});

