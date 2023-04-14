import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { ClientModule } from "./client/client.module";
import { dataSourceOptions } from "./infrastructure/database/data-source.config";
import { minioOptions } from "./infrastructure/objectStorage/minio.config";

@Module({
  imports: [
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    ClientModule,
  ],
  providers: [],
})
export class AppModule {}
