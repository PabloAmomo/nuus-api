import { getFeeds } from './getFeeds';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';

test('getFeeds -> get -> /feeds (without x-user in header) (error 500)', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' } });
  const result = await getFeeds(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid user' });
  assert.equal(500, response.statusCode);
});

test('getFeeds -> get -> /feeds?count=60 (Invalid Count)', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds?count=60', params: { id: '1' }, headers: { 'x-user': 'user' } });
  const result = await getFeeds(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid count' });
  assert.equal(500, response.statusCode);
});

test('getFeeds -> get -> /feeds', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds', headers: { 'x-user': 'user' } });
  const result = await getFeeds(request, response);
  const json = response._getJSONData();
  assert.equal('success', json.status);
  assert.equal(200, response.statusCode);
});
