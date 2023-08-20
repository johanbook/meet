import { TestRouter, render, screen } from "src/test";

import { Link } from ".";

describe("<Link />", () => {
  it("renders", () => {
    render(
      <TestRouter>
        <Link to="/" />
      </TestRouter>
    );
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});
