const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const log4js = require('log4js');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const cors = require('cors');

log4js.configure({
  appenders: [
        { type: 'console' },
  ],
});

const logger = log4js.getLogger('app');
logger.setLevel('DEBUG');
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

app.use(cors());
app.options('*', cors());         // Enable pre-flight across all routes

app.use(bodyParser.json());

app.use(validator());

const config = {
  appRoot: __dirname, // required config
  configDir: 'swagger/config',
};

function errorHandler (err, req, res, next) { // eslint-disable-line
  let error = err;

  if (typeof err !== 'object') {
    // If the object is not an Error, create a representation that appears to be
    error = {
      message: String(err), // Coerce to string
    };
  } else {
    // Ensure that err.message is enumerable (It is not by default)
    Object.defineProperty(err, 'message', { enumerable: true });
  }

  const httpStatusCode = error.status || error.statusCode || err.code || 500;

  // Return a JSON representation of #/definitions/ErrorResponse
  res.status(httpStatusCode);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(error));
}

SwaggerExpress.create(config, (err, swaggerExpress) => {
  if (err) {
    throw err;
  }

    // install middleware
  swaggerExpress.register(app);

  app.use(errorHandler);

    // Log any responses that violate the response schema
  swaggerExpress.runner.on(
    'responseValidationError',
    validationResponse =>
      logger.error(JSON.stringify(validationResponse.errors)) // eslint-disable-line
  );

  const port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/status']) {
    logger.info(`\ntry this:\ncurl http://localhost:${port}/v1/status`);
  }
});

if (process.env.swagger_mockMode || process.env.TEST_MODE === 'y') {
  logger.info('Running in mock mode');
}

module.exports = app;
