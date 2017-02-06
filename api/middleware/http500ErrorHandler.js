function errorHandler (err, req, res, next) { // eslint-disable-line
  // Return a JSON representation of #/definitions/ErrorResponse
  res.status(500);
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ message: 'Internal server error' }));
}

module.exports = errorHandler;
