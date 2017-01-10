#!/bin/bash
set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
NODE_ENV="development"

if [[ $BRANCH == 'master' ]]; then
  NODE_ENV="production"
fi

echo "Deploying from branch ${BRANCH} with NODE_ENV=${NODE_ENV}"
now -e NODE_ENV=${NODE_ENV} -t ${NOW_TOKEN} -C
