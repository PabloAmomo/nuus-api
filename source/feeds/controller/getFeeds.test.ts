import { EventEmitter } from 'node:events';
import { getFeeds } from './getFeeds';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';

test('getFeeds -> get -> /feeds (without x-user in header) (error 500)', () => {
  const res = httpMocks.createResponse();
  const req = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' } });
  getFeeds({req, res});
  const json = res._getJSONData();
  assert.deepEqual(json, { error: 'invalid user' });
  assert.equal(500, res.statusCode);
});

test('getFeeds -> get -> /feeds?count=60 (Invalid Count)', () => {
  const res = httpMocks.createResponse();
  const req = httpMocks.createRequest({ method: 'GET', url: '/feeds?count=60', params: { id: '1' }, headers: { 'x-user': 'user' } });
  getFeeds({req, res});
  const json = res._getJSONData();
  assert.deepEqual(json, { error: 'invalid count' });
  assert.equal(500, res.statusCode);
});

test('getFeeds -> get -> /feeds', () => {
  const myEmitter = EventEmitter.EventEmitter;
  const res = httpMocks.createResponse({ eventEmitter: myEmitter });
  res.on('check', () => {
    const json = res._getJSONData();
    assert.equal('success', json.status);
    assert.equal(200, res.statusCode);
  });
  const req = httpMocks.createRequest({ method: 'GET', url: '/feeds', headers: { 'x-user': 'user' } });
  getFeeds({res, req, onFinish: () => res.emit('check')});
});
