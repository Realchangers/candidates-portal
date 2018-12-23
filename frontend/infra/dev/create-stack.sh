#!/bin/bash
aws cloudformation create-stack \
  --stack-name candidates-portal-frontend-dev \
  --region eu-west-1 \
  --template-body file://cloud-formation.yml \
