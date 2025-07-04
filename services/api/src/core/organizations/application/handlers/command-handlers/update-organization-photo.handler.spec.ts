import { BadRequestException } from "@nestjs/common";
import { Repository } from "typeorm";

import { map } from "src/core/mapper";
import { PhotoService } from "src/core/photos";
import { beforeEach, describe, expect, it, vi } from "src/test";
import { createMockRepository } from "src/test/mocks";

import { ActiveOrganizationService } from "../../../domain/services/active-organization.service";
import { Organization } from "../../../infrastructure/entities/organization.entity";
import { UpdateOrganizationPhotoCommand } from "../../contracts/commands/update-organization-photo.command";
import { UpdateOrganizationPhotoHandler } from "./update-organization-photo.handler";

describe(UpdateOrganizationPhotoHandler.name, () => {
  let activeOrganizationService: ActiveOrganizationService;
  let commandHandler: UpdateOrganizationPhotoHandler;
  let organizations: Repository<Organization>;
  let photoService: PhotoService;

  beforeEach(() => {
    activeOrganizationService = {
      fetchCurrentActiveOrganization: vi.fn(),
    } as any;

    organizations = createMockRepository<Organization>();

    photoService = {
      resize: vi.fn(),
      uploadPhoto: vi.fn(() => ({})),
    } as any;

    commandHandler = new UpdateOrganizationPhotoHandler(
      activeOrganizationService,
      photoService,
      organizations,
    );
  });

  describe("can update organization photo", () => {
    it("should throw if active organization not found", async () => {
      const command = map(UpdateOrganizationPhotoCommand, {
        photo: "my-photo",
      });

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should throw if organization not found", async () => {
      const command = map(UpdateOrganizationPhotoCommand, {
        photo: "my-photo",
      });

      vi.spyOn(
        activeOrganizationService,
        "fetchCurrentActiveOrganization",
      ).mockResolvedValue({ organizationId: 1 } as any);

      await expect(commandHandler.execute(command)).rejects.toThrow(
        BadRequestException,
      );
    });

    it("should save changes to organization", async () => {
      const command = map(UpdateOrganizationPhotoCommand, {
        photo: "my-photo",
      });

      const organization = { id: 1 };

      vi.spyOn(
        activeOrganizationService,
        "fetchCurrentActiveOrganization",
      ).mockResolvedValue({ organizationId: 1 } as any);

      vi.spyOn(organizations, "findOne").mockResolvedValue(organization as any);

      vi.spyOn(organizations, "save").mockResolvedValue(undefined as any);

      await commandHandler.execute(command);

      expect(organizations.save).toHaveBeenCalledWith({
        ...organization,
        photo: { organizationId: organization.id },
      });
    });
  });
});
