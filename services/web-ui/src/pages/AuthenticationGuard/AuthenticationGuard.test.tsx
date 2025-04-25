import {
  ReactQueryTestProvider,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { AuthenticationGuard } from ".";

describe.skip("<AuthenticationGuard />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <AuthenticationGuard>
          <p>my-text</p>
        </AuthenticationGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Welcome/);
    expect(message).toBeInTheDocument();
  });
});
