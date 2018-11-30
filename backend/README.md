# Backend
## Installation
* run `npm install -g serverless` to install Serverless.com CLI
* run `yarn` to install dependencies
* run `yarn dynamodb:install` to install local DynamoDB (requires JRE 6+)
## Cleanup
* run `yarn dynamodb:remove` to remove local DynamoDB installation
## Local run
* run `yarn start` to start local AWS lambda runtime
## Deploy
* run `yarn deploy` to deploy application to AWS
## Test DynamoDB
* query: `curl http://localhost:8080/query -d '{"query": "query UserQuery { user(id: \"123\") {userName id}}"}'`
* update: `curl 'http://localhost:8080/query' -d '{"query":"mutation { changeUserName(id: \"123\", userName: \"Jeremy\")}"}'`
* **note**: DynamoDB is in-memory database, so no changes will be persisted after shutdown
