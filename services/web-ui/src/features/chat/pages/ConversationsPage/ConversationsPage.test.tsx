import { ReactQueryTestProvider, TestRouter, render, screen } from "src/test";

import { ConversationsPage } from ".";

describe.skip("<ConversationsPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <ConversationsPage />
        </ReactQueryTestProvider>
      </TestRouter>
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
