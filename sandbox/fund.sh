#!/bin/bash

# fund account $dest with $amt algo in algokit localnet

dest=$1
amt=${2:-500000000000}

if [ "$dest" == "" ]; then
  echo no destination
  exit 1;
fi

src=$(algokit goal account list | sort -nrk4 | awk '{print $3}' | head -n 1)

echo "Send $amt $src > $dest"

algokit goal clerk send -f $src -a $amt -t $dest
