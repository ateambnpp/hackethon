#!/bin/bash -e

echo This script is only included for reference, so you can see how the miners work.
exit

NETWORKID=16123
DATADIR=~/.ethereum-norsborg-data-$NETWORKID
ETHERBASE=0x1111111111111111111111111111111111111111

mkdir -p $DATADIR
cp ./static-nodes.json $DATADIR
geth --datadir $DATADIR init ./genesis-block-norsborg.json
geth --datadir $DATADIR --nat none --networkid $NETWORKID --port $NETWORKID --rpc --rpcaddr 0.0.0.0 --rpccorsdomain '*' --bootnodes leave-me-alone --etherbase $ETHERBASE js mineOnDemand.js
