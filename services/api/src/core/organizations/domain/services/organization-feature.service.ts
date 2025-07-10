import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { OrganizationFeature } from "../../infrastructure/entities/organization-feature.entity";
import { OrganizationFeatureEnum } from "../../organization-feature.enum";

@Injectable()
export class OrganizationFeatureService {
  constructor(
    @InjectRepository(OrganizationFeature)
    private readonly organizationFeature: Repository<OrganizationFeature>,
  ) {}

  async fetchOrganizationFeatures(
    organizationId: number,
  ): Promise<OrganizationFeatureEnum[]> {
    const matchingFeatures = await this.organizationFeature.find({
      select: {
        feature: true,
      },
      where: {
        organizationId,
      },
    });

    return matchingFeatures.map((x) => x.feature);
  }
}
