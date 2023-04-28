# Technologies

This document outlines the different technologies used in the software system
and the reasoning behind these choices.

One of the aims of the system is the be run on-prem with minimal setup.

## Backend

The backend uses [Nestjs](https://docs.nestjs.com/) which is a Nodejs framework.

### HTTP Server: Fastify

[Fastify](fastify.io) as HTTP API as it is one of the most performant Nodejs
HTTP servers.

### ORM: TypeORM

[TypeORM](https://github.com/typeorm/typeorm) is used as an ORM.

## Persistence

### Database: Postgres

The software system uses [Postgres](https://www.postgresql.org/) as database
with the [PostGIS](https://postgis.net) extensions for handling geospatial data.

### Object storage: Minio

[Minio](https://min.io/) is an on-prem S3-compatible object storage which is
used for e.g. storing user profile photos.

For a production environment, a cloud-based object storage is recommended due to
being cheaper than using fault-tolerant block storage (which would be required
for self-hosting an object storage).

## Frontend

The frontend is written in [React](https://react.dev/). The ambition is to in
the future also write an Android app using React Native.

[OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator/) is used
to generate HTTP SDK for the web client based on the OpenAPI specification of
the backend.

## IDP: Supertokens

[Supertokens](https://supertokens.com/) is used as a self-hosted IDP.

## Infrastructure

### Edge router: Traefik

[Traefik](https://doc.traefik.io/traefik/) is used for routing.
