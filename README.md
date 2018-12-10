# Candidates portal
## What it is?
Candidates portal is a web application for Realchangers candidates, who seeks new job. It allows them to create a profile and based on their interests, get the most relevant job offers from our partner companies.
## Tools and technologies
The application is written in JavaScript, so your main tool is:
* `npm` - install from https://nodejs.org/
### Frontend technology stack
* React.js
* Relay
* Foundation (CSS framework)
* GraphQL
* Jest
### Backend technology stack
* node.js
* serverless.com (deployment to AWS Lambda)
* AWS SDK (for DynamoDB)
* Jest
## AWS Deployment Components
* frontend - S3, CloudFront
* backend - API Gateway, Lambda@Edge (CloudFront), DynamoDB
