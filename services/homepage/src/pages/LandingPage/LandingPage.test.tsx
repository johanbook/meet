import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { LandingPage } from ".";

describe("<LandingPage />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <TestRouter>
          <LandingPage />
        </TestRouter>
      </ReactQueryTestProvider>
    );

    const message = await screen.findByText(/Meet/);
    expect(message).toBeInTheDocument();
  });
});
