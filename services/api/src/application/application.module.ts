import { Module } from "@nestjs/common";

import { PhotosModule } from "./photos/photos.module";
import { ProfileModule } from "./profile/profile.module";

@Module({
  imports: [PhotosModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class ApplicationModule {}
