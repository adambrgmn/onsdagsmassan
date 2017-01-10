#!/bin/bash
set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
NODE_ENV="development"
ALIAS=${ALIAS_DEVELOPMENT}

if [[ $BRANCH == 'master' ]]; then
  NODE_ENV="production"
  ALIAS=${ALIAS_PRODUCTION}
fi

echo "Deploying from branch ${BRANCH}"
echo "with NODE_ENV=${NODE_ENV}"
echo "With alias ${ALIAS}"
now -e NODE_ENV=${NODE_ENV} -t ${NOW_TOKEN} -a ${ALIAS} -C
