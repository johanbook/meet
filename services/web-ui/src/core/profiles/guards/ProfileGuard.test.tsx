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

import { ProfileGuard } from ".";

describe("<ProfileGuard />", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders children if profile exists", async () => {
    vi.spyOn(profileApi, "checkIfProfileExists").mockImplementation(
      async () => true,
    );

    render(
      <ReactQueryTestProvider>
        <ProfileGuard>
          <p>my-text</p>
        </ProfileGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/my-text/);
    expect(message).toBeInTheDocument();
  });

  it("renders profile page if profile does not exist", async () => {
    vi.spyOn(profileApi, "checkIfProfileExists").mockImplementation(
      async () => false,
    );

    render(
      <ReactQueryTestProvider>
        <ProfileGuard>
          <p>my-text</p>
        </ProfileGuard>
      </ReactQueryTestProvider>,
    );

    const message = await screen.findByText(/welcome.header/);
    expect(message).toBeInTheDocument();
  });
});
