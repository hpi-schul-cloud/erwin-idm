#!/bin/pwsh

docker create `
    --name erwin-idm `
    -p 8080:8080 `
    -p 8443:8443 `
    -e KEYCLOAK_ADMIN=admin `
    -e KEYCLOAK_ADMIN_PASSWORD=admin `
    schulcloud/erwin-idm/dev:latest
