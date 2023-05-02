import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { MatchesPage } from ".";

describe.skip("<MatchesPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <MatchesPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
