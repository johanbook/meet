import {
  ReactQueryTestProvider,
  TestRouter,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { ProfileCreationPage } from ".";

describe.skip("<ProfileCreationPage />", () => {
  it("renders a message", async () => {
    render(
      <ReactQueryTestProvider>
        <TestRouter>
          <ProfileCreationPage />
        </TestRouter>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Welcome/);
    expect(message).toBeInTheDocument();
  });
});
