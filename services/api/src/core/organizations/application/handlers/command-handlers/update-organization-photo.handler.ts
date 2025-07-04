import { BadRequestException } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { BUCKET_NAMES } from "src/core/object-storage/buckets.config";
import { PhotoService } from "src/core/photos";

import { ActiveOrganizationService } from "../../../domain/services/active-organization.service";
import { OrganizationPhoto } from "../../../infrastructure/entities/organization-photo.entity";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { UpdateOrganizationPhotoCommand } from "../../contracts/commands/update-organization-photo.command";

@CommandHandler(UpdateOrganizationPhotoCommand)
export class UpdateOrganizationPhotoHandler
  implements ICommandHandler<UpdateOrganizationPhotoCommand, void>
{
  constructor(
    private readonly activeOrganizationService: ActiveOrganizationService,
    private readonly photoService: PhotoService,
    @InjectRepository(Organization)
    private readonly organizations: Repository<Organization>,
  ) {}

  async execute(command: UpdateOrganizationPhotoCommand) {
    const activeOrganization =
      await this.activeOrganizationService.fetchCurrentActiveOrganization();

    if (!activeOrganization) {
      throw new BadRequestException("Active organization not found");
    }

    const organization = await this.organizations.findOne({
      where: { id: activeOrganization.organizationId },
    });

    if (!organization) {
      throw new BadRequestException("Organization not found");
    }

    const resizedPhoto = await this.photoService.resize(
      command.photo as Buffer,
      {
        width: 200,
      },
    );

    const photo = await this.photoService.uploadPhoto(
      OrganizationPhoto,
      BUCKET_NAMES.ORGANIZATION_PHOTO,
      resizedPhoto,
    );
    photo.organizationId = organization.id;

    organization.photo = photo;

    await this.organizations.save(organization);
  }
}
