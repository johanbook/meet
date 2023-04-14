import SwipingPage from ".";
import { TestRouter, render, screen } from "../../test";

describe("<SwipingPage />", () => {
  it("renders a welcome message", () => {
    render(
      <TestRouter>
        <SwipingPage />
      </TestRouter>
    );

    const welcomeMessage = screen.getByText(/Welcome/);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
