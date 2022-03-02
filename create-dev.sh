#!/bin/bash

docker create \
 -p 8080:8080 \
 -p 8443:8443 \
 -e KEYCLOAK_ADMIN=admin \
 -e KEYCLOAK_ADMIN_PASSWORD=admin \
 --name erwin-idm \
 schulcloud/erwin-idm/dev:latest