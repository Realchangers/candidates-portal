#!/bin/bash
aws cloudformation update-stack \
  --stack-name Web-React-App \
  --region eu-west-2 \
  --template-body file://cloud-formation.yml \
