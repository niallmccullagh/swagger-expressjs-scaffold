const logger = require('log4js').getLogger('ensureServerRunning');

// Express server does not come up immediately. Add a wee delay.
function ensureServerRunning() {
  beforeEach((done) => {
    setTimeout(() => {
      logger.info('Yes. I assume so.');
      done();
    }, 500);
  });
}

module.exports = ensureServerRunning;
