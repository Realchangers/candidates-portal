#!/bin/bash
aws cloudformation create-stack \
  --stack-name candidates-portal-frontend-dev \
  --region eu-west-2 \
  --template-body file://cloud-formation.yml \
