#!/bin/sh

set -e

NAME=$APPNAME
CENV=$APPENV

if [ -z $NAME ]
then
    echo -e "\033[31m APPNAME NOT SET \033[0m\n";
    NAME=node-server
fi

if [ -z $CENV ]
then
    echo -e "\033[31m APPENV NOT SET \033[0m\n";
    CENV=prod
fi

CURTIME=$(date +"%Y-%m-%d %H:%M:%S")
echo -e "\033[32m**************************Application Information**************************\033[0m"
echo -e "\033[32mAPP_NAME: ${NAME}\033[0m"
echo -e "\033[32mAPP_ENV : ${CENV}\033[0m"
echo -e "\033[32mRUN_TIME: ${CURTIME}\033[0m"
echo -e "\033[32m***************************************************************************\033[0m"

exec "$@" "--env" "$CENV" "--no-daemon"
