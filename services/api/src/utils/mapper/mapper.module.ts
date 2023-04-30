import { Module } from "@nestjs/common";

import { MapperService } from "./mapper.service";

@Module({
  imports: [],
  providers: [MapperService],
  exports: [MapperService],
})
export class MapperModule {}
