It would be nice to stop on first failure, especially as integration specs take 
longer to run. 

However there is this bug: https://github.com/jasmine/jasmine/issues/529 which means
that we don't get a good indication of why the spec failed. Therefore we set stopSpecOnExpectationFailure to false. Which 


If this bug is fixed we can set stopSpecOnExpectationFailure to true
