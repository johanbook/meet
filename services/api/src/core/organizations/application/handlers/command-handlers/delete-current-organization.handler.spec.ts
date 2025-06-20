import { TestSuite, beforeEach, describe, expect, it } from "src/test";

import { DeleteCurrentOrganizationHandler } from "./delete-current-organization.handler";

describe(DeleteCurrentOrganizationHandler.name, () => {
  let commandHandler: DeleteCurrentOrganizationHandler;

  let testSuite: TestSuite;

  beforeEach(() => {
    testSuite = new TestSuite();

    commandHandler = new DeleteCurrentOrganizationHandler(
      testSuite.currentOrganizationService,
      testSuite.currentProfileService,
      testSuite.organizationService,
    );
  });

  describe("can update organizations", () => {
    it("should save changes to organization", async () => {
      await commandHandler.execute();

      expect(testSuite.organizations.delete).toHaveBeenCalled();
    });
  });
});
