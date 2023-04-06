import Link from ".";
import { TestRouter, render, screen } from "../../../test";

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
