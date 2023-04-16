import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import ChatPage from ".";

describe.skip("<ChatPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <ChatPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
