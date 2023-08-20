import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { OrganizationPage } from ".";

describe.skip("<OrganizationPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <OrganizationPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
