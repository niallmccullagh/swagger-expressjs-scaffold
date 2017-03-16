const SwaggerExpress = require('swagger-express-mw');
const app = require('express')();
const log4js = require('log4js');
const bodyParser = require('body-parser');
const errorHandler = require('./api/middleware/http500ErrorHandler');
const statusController = require('./api/controllers/status');

const appRoot = __dirname;

log4js.configure({
  appenders: [
        { type: 'console' },
  ],
});

const logger = log4js.getLogger('app');
logger.setLevel('INFO');
app.use(log4js.connectLogger(logger, { level: log4js.levels.INFO }));

app.use(bodyParser.json());

SwaggerExpress.create({ appRoot }, (err, swaggerExpress) => {
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
    // Map status to /status
    app.get('/status', statusController.status);

    logger.info(`\ntry this:\ncurl http://localhost:${port}/status`);
  }
});


if (process.env.swagger_mockMode || process.env.TEST_MODE === 'y') {
  logger.info('Running in mock mode');
}

module.exports = app;
