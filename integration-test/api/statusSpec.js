const request = require('supertest');
const server = require('../../app');
const finishTest = require('../support/finishTest');
const ensureServerRunning = require('../support/ensureServerRunning');

const version = '/v1';

describe('Status Endpoint', () => {
  ensureServerRunning();

  it('should exist', (done) => {
    request(server)
      .get(`${version}/status`)
      .set('Accept', 'application/json')
      .expect(200, { status: 'OK' })
      .end(finishTest(done));
  });
});
