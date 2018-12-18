# Frontend
## About
Frontend is implemented in React and Relay using Foundation as CSS framework. It's using `create-react-app` bootstrap with eslint for validation and Jest as a test runner.
## Prerequisities
* npm, yarn
* watchman - optional (install with Brew: `brew install watchman`)
* backend module running (see `../backend/README.md`)
## Installation
* run `yarn install`
## Available scripts
* **start** - starts application on `http://localhost:3000`
* **build** - build application for deployment
* **test** - run all tests
* **eject** - ejects from create-react-application framework (one time operation)
* **relay** - compiles GraphQL schema
* **relay:watch** - same as `relay`, but in watch mode
* **deploy** - deploys application into AWS dev environment
* **deploy:prod** - deploys application into production AWS environment (which contains CloudFront, etc.)
