import { render, screen } from "src/test";

import { Button } from ".";

describe("<Button />", () => {
  it("renders", () => {
    render(<Button>my-text</Button>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
