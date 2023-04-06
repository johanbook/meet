# Contributing

## Running the project

### Development

To use a development build, run

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

## Technologies

### Backend

The backend uses [Nestjs](https://docs.nestjs.com/) which is a Nodejs framework.

#### HTTP Server: Fastify

[Fastify](fastify.io) as HTTP API.

#### ORM: TypeORM

[TypeORM](https://github.com/typeorm/typeorm) is used as an ORM.

### Persistence

#### Database: Postgres

The software system uses [Postgres](https://www.postgresql.org/) as database
with the [PostGIS](https://postgis.net) extensions for handling geospatial
geometries.

#### Object storage: Minio

[Minio](https://min.io/)

### Frontend

The frontend is written in [React](https://react.dev/).

[swagger-codegen](https://swagger.io/docs/open-source-tools/swagger-codegen/) is
used to generate HTTP SDK for the web client.

### IDP: Supertokens

[Supertokens](https://supertokens.com/) is used as a self-hosted IDP.

## Migrations

We use the
[TypeORM migration system](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
for running and generating migrations.

### Generating new migrations

Navigate to `./services/api` and run

```sh
generate-migration MyMigrationName
```

## Startup

First time starting the database we need to create a table for SuperTokens. Run
`docker exec -it <db_container> psql -U admin` and run

```sql
CREATE DATABASE supertokens;
```

## Git methodology

### Conventional commits

This project uses conventional commits for generating a changelog. See
[this guide](https://daily-dev-tips.com/posts/git-basics-conventional-commits/)
for how it should be used.

## Release procedure

This project uses [semver](https://semver.org/), handled by the NPM package
[standard-version](https://www.npmjs.com/package/standard-version). For creating
a new release, run the following commands:

```sh
npm run release
git push --follow-tags origin main
```
