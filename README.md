# ErWIn IDM

ErWIn IDM is a customized [`Keycloak`](https://github.com/keycloak/keycloak) docker image for the [dBildungscloud Server](https://github.com/hpi-schul-cloud/schulcloud-server).

The container is intend to be used for local development purpose.

## Build development container locally
To build the container execute following command:

```
docker build --target development -t schulcloud/erwin-idm/dev .
docker run -p 8080:8080 -p 8443:8443 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin schulcloud/erwin-idm/dev:latest
```


To create the container execute following command:
```
docker create -d --name erwin-idm -p 8080:8080 -p 8443:8443 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin schulcloud/erwin-idm/dev:latest
```

To start (or stop) the container execute following command:

```
docker start erwin-idm
docker stop erwin-idm
```

## Strucuture

`./build_dev.sh`: Builds the Keycloak container for local development
`./start_dev.sh`: Starts the Keycloak container with


