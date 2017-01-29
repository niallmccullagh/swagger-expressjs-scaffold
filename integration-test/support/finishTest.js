// Ensure that tests are failed when there is an error
function finishTest(done) {
  return (err) => {
    if (err) {
      done.fail(err);
    } else {
      done();
    }
  };
}

module.exports = finishTest;
