import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';
import { setReaded } from './setReaded';

test('setReaded -> post -> /setReaded/1 (without x-user in header)', () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded/1', params: { id: '1' }});
  const result = setReaded(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid user' });
  assert.equal(500, response.statusCode);
});

test('setReaded -> post -> /setReaded (invalid id)', () => {
  const response = httpMocks.createResponse();
  const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded'});
  const result = setReaded(request, response);
  const json = response._getJSONData();
  assert.deepEqual(json, { error: 'invalid id' });
  assert.equal(500, response.statusCode);
});

// test('setReaded -> post -> /setReaded/1', () => {
//   const response = httpMocks.createResponse();
//   const request = httpMocks.createRequest({ method: 'POST', url: '/setReaded/1', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   const result = setReaded(request, response);
//   const json = response._getJSONData();
//   assert.notEqual(null, json.error);
//   assert.equal(500, response.statusCode);
// });

// test('setReaded -> post -> /setReaded (Feeds by POST)', () => {
//   const response = httpMocks.createResponse();
//   const request = httpMocks.createRequest({ method: 'POST', body: { feedsId: 1 }, url: '/setReaded', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   const result = setReaded(request, response);
//   const json = response._getJSONData();
//   assert.equal(500, response.statusCode);
//   assert.notEqual(null, json.error);
// });

// test('setReaded -> post -> /setReaded (Feeds by POST)', () => {
//   const response = httpMocks.createResponse();
//   const request = httpMocks.createRequest({ method: 'POST', body: { feedsId: "1,2" }, url: '/setReaded', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   const result = setReaded(request, response);
//   const json = response._getJSONData();
//   assert.equal(500, response.statusCode);
//   assert.notEqual(null, json.error);
// });