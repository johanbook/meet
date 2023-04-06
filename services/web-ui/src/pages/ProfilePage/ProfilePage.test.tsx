import LandingPage from ".";
import { TestRouter, render, screen } from "../../test";

describe("<LandingPage />", () => {
  it("renders a welcome message", () => {
    render(
      <TestRouter>
        <LandingPage />
      </TestRouter>
    );

    const welcomeMessage = screen.getByText(/Welcome/);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
