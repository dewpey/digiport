#!/bin/bash

branch=$(git symbolic-ref --short HEAD)

if [ $branch = 'develop' ]
then
  echo "You are on " $branch
  echo "Running deployment for staging env"
  npm run deploy-test
fi

if [ $branch = 'master' ]
then
  echo "You are on " $branch
  echo "Running deployment for production env"
  npm run deploy
fi