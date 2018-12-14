#!/bin/bash
aws cloudformation update-stack \
  --stack-name Candidates-Portal-Frontend \
  --region eu-west-2 \
  --template-body file://cloud-formation.yml \
