import { describe, expect, it, render, screen } from "src/test";

import { VerticalCenter } from ".";

describe("<VerticalCenter />", () => {
  it("renders", () => {
    render(<VerticalCenter>my-text</VerticalCenter>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
