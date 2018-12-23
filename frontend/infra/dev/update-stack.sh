#!/bin/bash
aws cloudformation update-stack \
  --stack-name candidates-portal-frontend-dev \
  --region eu-west-1 \
  --template-body file://cloud-formation.yml \
