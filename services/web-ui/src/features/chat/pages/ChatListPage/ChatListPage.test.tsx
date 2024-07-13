import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { ChatListPage } from ".";

describe.skip("<ChatListPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <ChatListPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
