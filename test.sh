#!/usr/bin/env sh
docker-compose -f docker-compose.test.yml up --exit-code-from test $1 