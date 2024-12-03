#!/bin/bash

set -o xtrace

. accounts.sh

echo 'pact carpet replace injury soap illegal robot critic sibling pride excess regret gasp south afraid orient black category prefer aim poet jelly hurt abstract wealth' | algokit goal account import & 2> /dev/null

echo 'grass universe negative theme energy hill cattle field cabbage until aim oyster immune tuna figure approve cute episode liar desert rotate poem fragile above critic' | algokit goal account import & 2> /dev/null

set -e

./fund.sh $creator &
./fund.sh $user &

wait

algokit goal clerk compile app.teal

echo compiled

out=$(algokit goal app create --creator MR3CVALT5BEFD3QHAEV3JVDFV3ACWIBTTKTCK3WGZK73OOHAXOVP53J6RA --approval-prog app.teal --clear-prog app.teal --local-byteslices 1)

echo -e "$out"

appid=$(echo -e "$out" | grep -oE "Created app with app index [0-9]+" | cut -d\  -f6)

echo appid=$appid

echo -n $appid > appid
