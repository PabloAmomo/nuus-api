import { EventEmitter } from 'node:events';
import { getFeed } from './getFeed';
import assert from 'node:assert';
import httpMocks from 'node-mocks-http';
import test from 'node:test';

test('getFeed -> get -> /feeds/1 (without x-user in header) (error 500)', () => {
  const res = httpMocks.createResponse();
  const req = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' } });
  getFeed({ req, res });
  assert.equal(500, res.statusCode);
});

test('getFeed -> get -> /feeds/1', () => {
  const myEmitter = EventEmitter.EventEmitter;
  const res = httpMocks.createResponse({ eventEmitter: myEmitter });
  res.on('check', () => {
    const json = res._getJSONData();
    assert.equal(200, res.statusCode);
    assert.equal('success', json.status);
  });
  const req = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' }, headers: { 'x-user': 'user' } });
  getFeed({ req, res, onFinish: () => res.emit('check')});
});

