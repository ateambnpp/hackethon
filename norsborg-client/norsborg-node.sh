#!/bin/bash -e

GETH=geth

VERIFIED_VERSION=1.5.8-unstable
VERIFIED_REVISION=f087c66f
if ! $GETH version | grep $VERIFIED_VERSION || ! $GETH version | grep $VERIFIED_REVISION; then
	echo ''
	echo '***********************************************************************'
    echo "N.B. This is only verified against $GETH version $VERIFIED_VERSION."
	echo ''
    echo 'You have:'
    $GETH version | grep -E '^(Version|Git Commit):'
	echo ''
    echo "If you encounter problems please try $VERIFIED_VERSION instead."
	echo '***********************************************************************'
	echo ''
fi

NETWORKID=16123
DATADIR=~/.ethereum-norsborg-data-$NETWORKID

mkdir -p $DATADIR
cp ./static-nodes.json $DATADIR

if numAccounts=$($GETH --datadir $DATADIR account | grep -c Account) && [ $numAccounts -ne 0 ]; then
	echo "Inbuilt account already exists."
else
	echo "===================================================="
	echo "Creating inbuilt account.."
	echo "===================================================="
	inbuilt_account=0x$($GETH --datadir $DATADIR --password password account new | sed 's/^Address:..//;s/.$//')
	echo "Created account $inbuilt_account, will start geth with it unlocked."
fi

$GETH --datadir $DATADIR init ./genesis-block-norsborg.json
$GETH --fast --unlock 0 --password password --datadir $DATADIR --nat none --networkid $NETWORKID --port $NETWORKID --rpc --rpcaddr 0.0.0.0 --rpccorsdomain '*' console
