import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { SettingsPage } from ".";

describe.skip("<SettingsPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <SettingsPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
