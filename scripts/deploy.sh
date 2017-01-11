#!/bin/bash
set -e

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
NODE_ENV="development"
ALIAS=${ALIAS_DEVELOPMENT}

function get_id {
  now ls onsdagsmassan -t ${NOW_TOKEN} | sed -n 5p | awk '{ print $1 }'
}

if [[ $BRANCH == 'master' ]]; then
  NODE_ENV="production"
  ALIAS=${ALIAS_PRODUCTION}
fi

echo "Deploying from branch ${BRANCH}"
echo "with NODE_ENV=${NODE_ENV}"
now -e NODE_ENV=${NODE_ENV} -e FB_API_KEY=${FB_API_KEY} -t ${NOW_TOKEN} -C -f

echo "Setting alias for deployment to ${ALIAS}"
now alias set $(get_id) ${ALIAS} -t ${NOW_TOKEN}
