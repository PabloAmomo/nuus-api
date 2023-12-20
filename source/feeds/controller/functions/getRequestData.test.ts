import { getRequestData } from './getRequestData.js';
import httpMocks from 'node-mocks-http';
import assert from 'node:assert';
import test from 'node:test';

test('getRequestData : get -> /feeds/1', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1', params: { id: '1' }, headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 10, user: 'user', filter: [], back: 0, id: 1, feedsId: [] });
});

test('getRequestData : get -> /feeds/1?count=20', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1?count=20', params: { id: '1' }, headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 20, user: 'user', filter: [], back: 0, id: 1, feedsId: [] });
});

test('getRequestData : get -> /feeds/1?count=20&filter=1,2,3', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1?count=20&filter=1,2,3', params: { id: '1' }, headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 20, user: 'user', filter: [ '1', '2', '3' ], back: 0, id: 1, feedsId: [] });
});


test('getRequestData : get -> /feeds/?count=20&filter=1,2,3 (Without id)', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/?count=20&filter=1,2,3', headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 20, user: 'user', filter: [ '1', '2', '3' ], back: 0, id: NaN, feedsId: [] });
});

test('getRequestData : get -> /feeds/1?count=20&filter=1,2,3&feedsId=4,5', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds/1?count=20&filter=1,2,3&feedsId=4,5', params: { id: '1' }, headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 20, user: 'user', filter: [ '1', '2', '3' ], back: 0, id: 1, feedsId: [ '4', '5' ] });
});

test('getRequestData : post -> /feeds-reader (feedsId on body)', async () => {
  const request = httpMocks.createRequest({ method: 'GET', url: '/feeds-readed', body: { feedsId: '4, 5' }, headers: { 'x-user': 'user' }});
  const result = getRequestData(request);
  assert.deepEqual(result,  { count: 10, user: 'user', filter: [], back: 0, id: NaN, feedsId: [ '4', '5' ] });
});
