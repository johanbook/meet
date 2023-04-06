import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ClientModule } from "./client/client.module";
import { dataSourceOptions } from "./infrastructure/database/dataSourceOptions";

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...dataSourceOptions, autoLoadEntities: true }),
    ClientModule,
  ],
  providers: [],
})
export class AppModule {}
