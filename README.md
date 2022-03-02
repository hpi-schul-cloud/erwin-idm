# ErWIn IDM

ErWIn IDM is a customized [`Keycloak`](https://github.com/keycloak/keycloak) docker image for the [dBildungscloud Server](https://github.com/hpi-schul-cloud/schulcloud-server).

The container is intend to be used for local development purpose.

## Build development container locally

To build the container execute following command:

```bash
docker build --target development -t schulcloud/erwin-idm/dev .
```

To create the container execute following command:

```bash
docker create --name erwin-idm -p 8080:8080 -p 8443:8443 -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin schulcloud/erwin-idm/dev:latest
```

To start (or stop) the container execute following command:

```bash
docker start erwin-idm
```

```bash
docker stop erwin-idm
```

The Keycloak Admin Console will be available at [`http://localhost:8080`](http://localhost:8080) or [`https://localhost:8443`](https://localhost:8443). You may login into the instance with username `admin` and password `admin`.

## Keycloak configuration

The developer build is configured to start Keycloak in developer mode. It is configured without proxy or clustering capabilities (discovery, replication, fail-over). It'll use a local flat-file database, has self-signed certificates for TLS, and exposes [`metrics`](http://localhost:8080/metrics).

## Strucuture

- `./build-dev.sh`: Builds the Keycloak image for local development.
- `./create-dev.sh`: Creates the Keycloak container for local development.
