const statusModel = require('../services/status');
const log = require('log4js').getLogger('status');

function status(request, response) {
  Promise.resolve(statusModel.get())
        .then((apiStatus) => {
          response.status(200);
          response.json(apiStatus);

          return response;
        })
        .catch((e) => {
          response.status(500);
          response.json({ status: 'FATAL' });
          log.error(e);
          return response;
        });
}

module.exports = {
  status,
};
