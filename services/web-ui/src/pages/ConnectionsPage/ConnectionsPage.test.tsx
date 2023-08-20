import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { ConnectionsPage } from ".";

describe.skip("<ConnectionsPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <ConnectionsPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
