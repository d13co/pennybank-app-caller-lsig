#!/bin/bash

set -e
set -o xtrace
set -o pipefail

# python3 sig.py > sig.teal

addr=$(algokit goal clerk compile sig.teal  | tail -n 1 | awk '{ print $2 }')

echo $addr

id=$(docker inspect algokit_sandbox_algod | jq -r .[0].Id)

docker cp $id:/root/goal_mount/sig.teal.tok .

bash gen-js.sh
