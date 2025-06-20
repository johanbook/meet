import {
  ReactQueryTestProvider,
  TestRouter,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { CurrentProfilePage } from ".";

describe.skip("<CurrentProfilePage />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <TestRouter>
          <CurrentProfilePage />
        </TestRouter>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Welcome/);
    expect(message).toBeInTheDocument();
  });
});
