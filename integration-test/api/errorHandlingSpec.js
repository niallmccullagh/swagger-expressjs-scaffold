const request = require('supertest');
const server = require('../../app');
const finishTest = require('../support/finishTest');
const ensureServerRunning = require('../support/ensureServerRunning');

const version = '/v1';

describe('Not found', () => {
  ensureServerRunning();

  it('should respond in json', (done) => {
    request(server)
      .get(`${version}/somemadeupthing`)
      .set('Accept', 'application/json')
      .expect(404, { message: 'Not Found' })
      .end(finishTest(done));
  });
});

describe('Method not allowed', () => {
  ensureServerRunning();

  it('should respond in json', (done) => {
    request(server)
      .put(`${version}/status`)
      .set('Accept', 'application/json')
      .expect((res) => { // eslint-disable-line
        expect(res.statusCode)
          .toBe(405);
        expect(res.body.message)
          .toBe('Method Not Allowed');
      })
      .end(finishTest(done));
  });
});
