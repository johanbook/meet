import { NotFoundException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { ObjectStorageService } from "src/core/object-storage";
import { CurrentProfileService } from "src/features/profiles";

import { ProfilePhoto } from "../../../infrastructure/entities/profile-photo.entity";
import { RemovePhotoCommand } from "../../contracts/commands/remove-photo.command";

@CommandHandler(RemovePhotoCommand)
export class RemovePhotoHandler
  implements ICommandHandler<RemovePhotoCommand, void>
{
  constructor(
    private readonly currentProfileService: CurrentProfileService,
    private objectStorageService: ObjectStorageService,
    @InjectRepository(ProfilePhoto)
    private readonly profilePhotos: Repository<ProfilePhoto>,
  ) {}

  async execute(command: RemovePhotoCommand) {
    const profileId = await this.currentProfileService.fetchCurrentProfileId();

    const photo = await this.profilePhotos.findOne({
      where: { id: command.id, profileId: profileId },
    });

    if (!photo) {
      throw new NotFoundException("Photo not found");
    }

    await this.profilePhotos.remove(photo);

    await this.objectStorageService.delete("profile-photos", photo.objectId);
  }
}
