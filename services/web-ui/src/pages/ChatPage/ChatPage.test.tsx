import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import ChatPage from ".";

describe("<ChatPage />", () => {
  it("renders a welcome message", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <ChatPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const welcomeMessage = await screen.findByText(
      /You do not have any matches/
    );
    expect(welcomeMessage).toBeInTheDocument();
  });
});
