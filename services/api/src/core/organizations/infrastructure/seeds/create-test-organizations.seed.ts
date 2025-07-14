import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { TestSeeder } from "src/core/database";

import { OrganizationFeatureEnum } from "../../organization-feature.enum";
import { ActiveOrganization } from "../entities/active-organization.entity";
import { OrganizationFeature } from "../entities/organization-feature.entity";
import { OrganizationMembership } from "../entities/organization-membership.entity";
import { Organization } from "../entities/organization.entity";

@TestSeeder()
export default class CreateTestOrganization implements Seeder {
  // Ensure seeder only runs once
  track = true;

  public async run(
    _: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const activeOrganizationFactory = factoryManager.get(ActiveOrganization);
    const featureFactory = factoryManager.get(OrganizationFeature);
    const membershipFactory = factoryManager.get(OrganizationMembership);
    const organizationFactory = factoryManager.get(Organization);

    const features = await Promise.all([
      featureFactory.make({ feature: OrganizationFeatureEnum.Blog }),
      featureFactory.make({ feature: OrganizationFeatureEnum.Bookings }),
      featureFactory.make({ feature: OrganizationFeatureEnum.Chat }),
      featureFactory.make({
        feature: OrganizationFeatureEnum.TimeSeries,
      }),
    ]);

    const memberships = [await membershipFactory.make({ profileId: 1 })];

    const createdOrganization = await organizationFactory.save({
      features,
      memberships,
      personal: false,
    });

    await activeOrganizationFactory.save({
      organizationId: createdOrganization.id,
      profileId: 1,
    });
  }
}
