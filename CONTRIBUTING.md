# Contributing

This document outlines the contributing guidelines for the project.

## Running the project

In order to run the project, start by cloning the repository onto your local
machine

```sh
git clone git@github.com:johanbook/meet.git
```

Create a `.env` file like so and replace the required fields:

```sh
cp .env.example .env

# Generate VAPI keys needed for web push notifications
cd services/api
./scripts/generate-vapi-keys >> <YOUR-ENV>
```

### Development

To use a development build, run

```sh
docker-compose -f docker-compose.dev.yaml up --build
```

The application will be available on [localhost](http://localhost) and the
console (admin portal) can be accessed at
[console.localhost](http://console.localhost).

### Production

Install Loki plugin

```sh
docker plugin install grafana/loki-docker-driver:latest --alias loki --grant-all-permissions
```

To use a production build, run

```sh
docker-compose -f docker-compose.prod.yaml up
```

The application will be available on [localhost](http://localhost) and the
console (admin portal) can be accessed at
[console.localhost](http://console.localhost).

## Database

### Migrations

We use the
[TypeORM migration system](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
for running and generating migrations.

#### Generating new migrations

Navigate to `./services/api` and run

```sh
./scripts/generate-migration MyMigrationName
```

### Seeding the database with test data

To seed the database with test data, run `services/api/scripts/seed-database`.

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
git checkout -b vX.Y.Z
```

Commit and push the files `package.json`, `package-lock.json` and `CHANGELOG.md`
and merge it to `main`. Then pull this changes in and run the following on the
main branch:

```sh
git tag vX.Y.Z
git push origin vX.Y.Z
```

## Style guide

### Naming conventions

All files and folders in backend services should be named in kebab-case.
