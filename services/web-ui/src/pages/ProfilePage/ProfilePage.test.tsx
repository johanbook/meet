import {
  ReactQueryTestProvider,
  TestRouter,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { ProfilePage } from ".";

describe.skip("<ProfilePage />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <TestRouter>
          <ProfilePage />
        </TestRouter>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Welcome/);
    expect(message).toBeInTheDocument();
  });
});
