import { getFeeds } from './getFeeds';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';
import { setReaded } from './setReaded';

test('setReaded -> post -> /setReaded/1 (without x-user in header)', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded/1', params: { id: '1' }});
  const result = await setReaded(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid user' });
  assert.equal(500, response.statusCode);
});

test('setReaded -> post -> /setReaded (invalid id)', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded'});
  const result = await setReaded(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid id' });
  assert.equal(500, response.statusCode);
});

test('setReaded -> post -> /setReaded/1', async () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded', params: { id: '1' }, headers: { 'x-user': 'user' }});
  const result = await setReaded(request, response);
  const json = response._getJSONData();
  assert.equal('success', json.result);
  assert.equal(200, response.statusCode);
});
