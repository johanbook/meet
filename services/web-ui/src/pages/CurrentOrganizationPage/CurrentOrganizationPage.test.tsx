import {
  ReactQueryTestProvider,
  TestRouter,
  describe,
  expect,
  it,
  render,
  screen,
} from "src/test";

import { CurrentOrganizationPage } from ".";

describe.skip("<CurrentOrganizationPage />", () => {
  it("renders message when no matches", async () => {
    render(
      <TestRouter>
        <ReactQueryTestProvider>
          <CurrentOrganizationPage />
        </ReactQueryTestProvider>
      </TestRouter>,
    );

    const message = await screen.findByText(/You do not have any matches/);
    expect(message).toBeInTheDocument();
  });
});
