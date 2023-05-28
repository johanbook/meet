import { render, screen } from "src/test";

import { Card } from ".";

describe("<Card />", () => {
  it("renders", () => {
    render(<Card>my-text</Card>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
