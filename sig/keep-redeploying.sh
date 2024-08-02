#!/usr/bin/env bash

if ! nodemon -v > /dev/null; then
  echo '"nodemon"' missing. install and try again:
  echo npm i -g nodemon
  exit 1
fi

nodemon -e py -w . --exec "bash deploy.sh"
