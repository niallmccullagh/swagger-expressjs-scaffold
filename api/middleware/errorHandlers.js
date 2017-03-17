const log4js = require('log4js');
const statuses = require('statuses');

const logger = log4js.getLogger('errorHandler');
const production = process.env.NODE_ENV === 'production';

function apiErrorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  let status = err.status || err.statusCode || 500;

  if (status < 400) {
    status = 500;
  }
  res.status(status);

  const body = {};

  // show the stacktrace when not in production
  if (!production) body.stack = err.stack;

  // Log errors
  if (status >= 500) {
    logger.error(err);
  }

  // Other option here is to use err.message
  body.message = statuses[status];
  res.json(body);
}

// Error handler of last resort.
function notFoundErrorHandler(req, res) {
  if (res.headersSent) {
    return;
  }

  const status = 404;
  const body = {
    message: statuses[status],
  };
  res.status(status);
  res.json(body);
}

module.exports = {
  apiErrorHandler,
  notFoundErrorHandler,
};
