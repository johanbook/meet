import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";

import { ApplicationModule } from "src/application/application.module";

import { PhotosController } from "./controllers/photos.controller";
import { ProfileController } from "./controllers/profile.controller";

@Module({
  imports: [CqrsModule, ApplicationModule],
  controllers: [PhotosController, ProfileController],
  providers: [],
})
export class ClientModule {}
