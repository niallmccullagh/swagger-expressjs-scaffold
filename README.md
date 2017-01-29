# Swagger ExpressJS Scaffold

![](https://nodesecurity.io/orgs/niallmccullagh/projects/fa45839d-f7a1-4cab-aeed-c12b17dac2e3/badge)

This is an API scaffold which provides a design first approach to API development built on 
Swagger and ExpressJS.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Node environment](https://github.com/nodenv/nodenv#readme)
- [yarn](https://yarnpkg.com)
- Setup node dependencies from the api folder:
```bash
yarn install
```

## Editing the API Contract
See [Editing the API](docs/editing_the_api.md)

## Running

From the api directory of the project:

### Start the application (from this api folder):
```bash
yarn start
```

### Get API status
```bash
curl localhost:10010/v1/status
```

### Run specs
```bash
yarn test
```

### Run integration tests
```bash
yarn integration-test
```

### Linting the code
Runs static analysis on the code to identify problematic patterns or code that doesn’t adhere to 
certain style guidelines.

Linting is there to guide you. If you feel yourself questioning rules then step back and think for 
a moment. These rules where created by people with extensive node experience so rather than 
suppressing the rule understand its purpose.

```bash
yarn lint
```

### Run vulnerabilities check
Use [nsp](nodesecurity.io) to run a vulnerabilities check on the projects dependencies.

```bash
yarn nsp
```


### With Docker
You can alternatively run it all in docker by following these [instructions](docs/running_in_docker.md)
