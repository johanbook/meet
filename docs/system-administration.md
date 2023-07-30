# System administration

The system exposes an administration area called "the console" where operators
can inspect or administered:

- application routing
- data storage
- logs
- users

Credentials are required in order to access the console. The area is intended
only for system operators and developers.

## Guide

To access the console for a given environment, navigate to `console.DOMAIN`
where `DOMAIN` is the URL where the environment is deployed. Note that
credentials are required to access the console which are configured during the
initial system setup.

By default, the console contains:

- [Grafana](https://grafana.com/oss/grafana/) for inspecting logs
- [Minio admin panel](https://min.io/) for administering system object storage
- [pgAdmin](https://www.pgadmin.org/) for administering system databases
- [Traefik dashboard](https://doc.traefik.io/traefik/) to inspect routing
- [Supertokens admin panel](supertokens.com/) for user administration

The console also contains link to:

- Service OpenAPI specifications
