# ErWIn IDM

ErWIn IDM is a customized [`Keycloak`](https://github.com/keycloak/keycloak) docker image for the [dBildungscloud Server](https://github.com/hpi-schul-cloud/schulcloud-server).

Images for local development or production are build for each Git tag via GitHub Actions.

## Manual build for local development image

Following steps are intent to build the container for local development purpose.

### Build steps (development)

You may use a pre-build image from [`GitHub Packages`](https://github.com/orgs/hpi-schul-cloud/packages?repo_name=erwin-idm). To build the container on your own execute following command:

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

### Keycloak configuration

The developer build is configured to start Keycloak in developer mode. It is configured without proxy or clustering capabilities (discovery, replication, fail-over). It'll use a local flat-file database, has self-signed certificates for TLS, and exposes [`metrics`](http://localhost:8080/metrics).

## Manual build for production image

Following steps are intent to build the container for production purpose. Note that this is for testing the production image locally only. The production image is build automatically. You may use a pre-build image from [`GitHub Packages`](https://github.com/orgs/hpi-schul-cloud/packages?repo_name=erwin-idm). For your development environment you want to make use of the [`development image`](#manual-build-for-local-development-image).

### Build steps (production)

To build the container execute following command:

```bash
docker build --target production -t schulcloud/erwin-idm .
```

To create the container, e.g. to test it locally, you'll need a PostgresSQL database up and running. Adjust, and execute following command to start the Keycloak production container for local testing:

```bash
docker create --name erwin-idm -p 8080:8080 -p 8443:8443  \
    -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin \
    -e KC_DB_URL=<DBURL> \
    -e KC_DB_USERNAME=<DBUSERNAME> \
    -e KC_DB_PASSWORD=<DBPASSWORD> \
    -e KC_HOSTNAME=localhost:8080
    schulcloud/erwin-idm:latest
```

To start (or stop) the container execute following command:

```bash
docker start erwin-idm
```

```bash
docker stop erwin-idm
```

The Keycloak Admin Console will be available at [`http://localhost:8080`](http://localhost:8080). You may login into the instance with username `admin` and password `admin`.

## Structure

- `./src`: Folder containing Keycloak customization (e.g. plug-ins, themes)
- `./Dockerfile`: The multi-staged Dockerfile for develop or production build.
- `./build-dev.sh`: Builds the Keycloak image for local development.
- `./create-dev.sh`: Creates the Keycloak container for local development.
