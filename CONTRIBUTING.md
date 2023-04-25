# Contributing

## Running the project

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

## Migrations

We use the
[TypeORM migration system](https://github.com/typeorm/typeorm/blob/master/docs/migrations.md)
for running and generating migrations.

### Generating new migrations

Navigate to `./services/api` and run

```sh
generate-migration MyMigrationName
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
