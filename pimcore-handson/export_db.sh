#!/bin/bash

source sync.properties

docker-machine start default
eval $(docker-machine env default)
docker-compose up -d
DOCKER_CONTAINER_NAME=$(eval "docker-compose ps -q web")
docker exec $DOCKER_CONTAINER_NAME mysqldump -udachcom -p$LOCAL_PW -hdb2.dachcom.local $INTEGRATION_DB | sed -e 's/DEFINER[ ]*=[ ]*[^*]*\*/\*/' > mysqldump.sql