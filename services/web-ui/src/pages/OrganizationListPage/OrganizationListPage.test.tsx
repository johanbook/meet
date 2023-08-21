import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { OrganizationListPage } from ".";

describe.skip("<OrganizationListPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <OrganizationListPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
