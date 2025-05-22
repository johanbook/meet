import { map } from "src/core/mapper";
import { TestSuite, beforeEach, describe, expect, it } from "src/test";

import { SwitchOrganizationCommand } from "../../contracts/commands/switch-organization.command";
import { SwitchOrganizationHandler } from "./switch-organization.handler";

describe(SwitchOrganizationHandler.name, () => {
  let commandHandler: SwitchOrganizationHandler;
  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    commandHandler = new SwitchOrganizationHandler(
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
      testSuite.organizationService,
    );
  });

  describe("can switch organization", () => {
    it("should save changes to organization", async () => {
      testSuite.memberships.exist = () => Promise.resolve(true);

      const command = map(SwitchOrganizationCommand, { organizationId: 1 });
      await commandHandler.execute(command);

      expect(testSuite.activeOrganizations.save).toHaveBeenCalled();
    });
  });
});
