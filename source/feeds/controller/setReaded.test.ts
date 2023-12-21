import { EventEmitter } from 'node:events';
import { setReaded } from './setReaded';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';

test('setReaded -> post -> /setReaded/1 (without x-user in header)', () => {
  const res = httpMocks.createResponse();
  const req = httpMocks.createRequest({ method: 'POST', url: '/setReaded/1', params: { id: '1' }});
  setReaded({req, res});
  const json = res._getJSONData();
  assert.deepEqual(json, { error: 'invalid user' });
  assert.equal(500, res.statusCode);
});

test('setReaded -> post -> /setReaded (invalid id)', () => {
  const res = httpMocks.createResponse();
  const req = httpMocks.createRequest({ method: 'POST', url: '/setReaded'});
  setReaded({req, res});
  const json = res._getJSONData();
  assert.deepEqual(json, { error: 'invalid id' });
  assert.equal(500, res.statusCode);
});

// test('setReaded -> post -> /setReaded/1', () => {
//   const myEmitter = EventEmitter.EventEmitter;
//   const res = httpMocks.createResponse({ eventEmitter: myEmitter });
//   res.on('check', () => {
//     const json = res._getJSONData();
//     assert.notEqual(null, json.error);
//     assert.equal(500, res.statusCode);
//     });
//   const req = httpMocks.createRequest({ method: 'POST', url: '/setReaded/1', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   setReaded({ req, res, onFinish: () => res.emit('check')});
// });

// test('setReaded -> post -> /setReaded (Feeds by POST)', () => {
//   const myEmitter = EventEmitter.EventEmitter;
//   const res = httpMocks.createResponse({ eventEmitter: myEmitter });
//   res.on('check', () => {
//     const json = res._getJSONData();
//     assert.equal(500, res.statusCode);
//     assert.notEqual(null, json.error);
//     });
//   const req = httpMocks.createRequest({ method: 'POST', body: { feedsId: 1 }, url: '/setReaded', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   setReaded({req, res, onFinish: () => res.emit('check')});
// });

// test('setReaded -> post -> /setReaded (Feeds by POST)', () => {
//   const myEmitter = EventEmitter.EventEmitter;
//   const res = httpMocks.createResponse({ eventEmitter: myEmitter });
//   res.on('check', () => {
//     const json = res._getJSONData();
//     assert.equal(500, res.statusCode);
//     assert.notEqual(null, json.error);
//   });
//   const req = httpMocks.createRequest({ method: 'POST', body: { feedsId: "1,2" }, url: '/setReaded', params: { id: '1' }, headers: { 'x-user': 'user' }});
//   setReaded({req, res, onFinish: () => res.emit('check')});
// });