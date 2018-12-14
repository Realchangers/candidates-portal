#!/bin/bash
aws cloudformation create-stack \
  --stack-name Web-React-App \
  --region eu-west-1 \
  --template-body file://cloud-formation.yml \
