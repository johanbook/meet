import {
  ReactQueryTestProvider,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { ProfileGuard } from ".";

describe.skip("<ProfileGuard />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <ProfileGuard>
          <p>my-text</p>
        </ProfileGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Welcome/);
    expect(message).toBeInTheDocument();
  });
});
