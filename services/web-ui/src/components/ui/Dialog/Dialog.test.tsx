import { render, screen } from "src/test";

import { Dialog } from ".";

describe("<Dialog />", () => {
  it("renders", () => {
    render(<Dialog>my-text</Dialog>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
