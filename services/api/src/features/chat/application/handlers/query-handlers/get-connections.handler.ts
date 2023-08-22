import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { mapArray } from "src/core/mapper";
import { PhotoService } from "src/core/photos";
import { CurrentOrganizationService } from "src/features/organizations";
import { CurrentProfileService } from "src/features/profiles";

import { Connection } from "../../../infrastructure/views/connection.view";
import { ConnectionDetails } from "../../contracts/dtos/connection.dto";
import { GetConnectionsQuery } from "../../contracts/queries/get-connections.query";

@QueryHandler(GetConnectionsQuery)
export class GetConnectionsHandler
  implements IQueryHandler<GetConnectionsQuery, ConnectionDetails[]>
{
  constructor(
    @InjectRepository(Connection)
    private readonly connections: Repository<Connection>,
    private readonly currentOrganizationService: CurrentOrganizationService,
    private readonly currentProfileService: CurrentProfileService,
    private readonly photoService: PhotoService,
  ) {}

  async execute() {
    const currentProfileId =
      await this.currentProfileService.fetchCurrentProfileId();

    const currentOrganizationId =
      await this.currentOrganizationService.fetchCurrentOrganizationId();

    const matchingConnections = await this.connections.find({
      where: {
        currentProfileId,
        organizationId: currentOrganizationId,
      },
    });

    return mapArray(ConnectionDetails, matchingConnections, (connection) => ({
      imageUrl:
        connection.profilePhotoObjectId &&
        this.photoService.getUrl(
          // This is a hack since it's difficult to get photo object reference
          { objectId: connection.profilePhotoObjectId } as any,
          "profile-photo",
        ),
      lastMessage: connection.lastMessage,
      lastMessageSent: connection.lastMessageSent,
      name: connection.name,
      profileId: connection.profileId,
    }));
  }
}
