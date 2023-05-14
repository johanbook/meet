# Logging

## Logging SDK

The application (mainly the api service) should output logs in JSON format to
stdout/stderr. This is done via the [Pino](https://www.npmjs.com/package/pino)
library. Documentation for the different used libraries are found here

- [Fastify](https://www.fastify.io/docs/latest/Reference/Logging/)
- [NestJS](https://docs.nestjs.com/techniques/logger)
- [TypeORM docs](https://github.com/typeorm/typeorm/blob/master/docs/logging.md)

## Logging aggregation

Log aggregation is handled by Loki which is handled by Grafana cloud. Logs are
shipped there using the Loki docker plugin.
