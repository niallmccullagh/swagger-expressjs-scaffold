function getStatus() {
  return {
    status: 'OK',
    version: 'v1',
  };
}

module.exports = {
  get: getStatus,
};
