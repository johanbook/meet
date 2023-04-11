import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MinioModule } from "nestjs-minio-client";

import { ClientModule } from "./client/client.module";
import { dataSourceOptions } from "./infrastructure/database/dataSourceOptions";
import { minioOptions } from "./infrastructure/objectStorage/minioOptions";

@Module({
  imports: [
    MinioModule.register({ ...minioOptions, isGlobal: true }),
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    ClientModule,
  ],
  providers: [],
})
export class AppModule {}
