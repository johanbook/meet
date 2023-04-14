import ProfilePage from ".";
import { TestRouter, render, screen } from "../../test";

describe("<ProfilePage />", () => {
  it("renders a welcome message", () => {
    render(
      <TestRouter>
        <ProfilePage />
      </TestRouter>
    );

    const welcomeMessage = screen.getByText(/Welcome/);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
