import { profileApi } from "src/apis";
import {
  ReactQueryTestProvider,
  afterEach,
  describe,
  expect,
  it,
  render,
  screen,
  vi,
} from "src/test";

import { AuthenticationGuard } from ".";

describe("<AuthenticationGuard />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children if authentication is successful", async () => {
    vi.spyOn(profileApi, "checkIfProfileExists").mockImplementation(
      async () => true,
    );

    render(
      <ReactQueryTestProvider>
        <AuthenticationGuard>
          <p>my-text</p>
        </AuthenticationGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/my-text/);
    expect(message).toBeInTheDocument();
  });

  it("does not render children if authentication fails", async () => {
    vi.spyOn(profileApi, "checkIfProfileExists").mockImplementation(
      async () => {
        throw new Error("my-error");
      },
    );

    render(
      <ReactQueryTestProvider>
        <AuthenticationGuard>
          <p>my-text</p>
        </AuthenticationGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/Unable to verify login/);
    expect(message).toBeInTheDocument();
  });
});
