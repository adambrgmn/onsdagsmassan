#!/bin/bash
set -e

function get_id {
  now ls $1 -t ${NOW_TOKEN} | sed -n 5p | awk '{ print $1 }'
}

BRANCH=${TRAVIS_BRANCH:-$(git rev-parse --abbrev-ref HEAD)}
NODE_ENV="development"
ALIAS=${ALIAS_DEVELOPMENT}
APP="onsdagsmassan"
ID=$(get_id ${APP})

if [[ $BRANCH == 'master' ]]; then
  NODE_ENV="production"
  ALIAS=${ALIAS_PRODUCTION}
fi

echo "Deploying \"${APP}\" from branch ${BRANCH}"
echo "with NODE_ENV=${NODE_ENV}"
now -e NODE_ENV=${NODE_ENV} -e FB_API_KEY=${FB_API_KEY} -t ${NOW_TOKEN} -C -f

echo "Setting alias for deployment id ${ID} to ${ALIAS}"
now alias set ${ID} ${ALIAS} -t ${NOW_TOKEN}

if [[ $BRANCH == 'master' ]]; then
  now alias set ${ID} www.${ALIAS} -t ${NOW_TOKEN}
fi
