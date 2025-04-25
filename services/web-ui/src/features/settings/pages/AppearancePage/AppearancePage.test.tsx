import {
  ReactQueryTestProvider,
  TestRouter,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { AppearancePage } from ".";

describe.skip("<AppearancePage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <AppearancePage />
        </ReactQueryTestProvider>
      </TestRouter>,
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
