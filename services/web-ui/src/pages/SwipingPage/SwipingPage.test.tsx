import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import SwipingPage from ".";

describe.skip("<SwipingPage />", () => {
  it("renders message when no nearby profiles found", async () => {
    render(
      <ReactQueryTestProvider>
        <TestRouter>
          <SwipingPage />
        </TestRouter>
      </ReactQueryTestProvider>
    );

    const message = await screen.findByText(/No profiles found/);
    expect(message).toBeInTheDocument();
  });
});
