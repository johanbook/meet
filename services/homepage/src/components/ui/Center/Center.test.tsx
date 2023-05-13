import { render, screen } from "src/test";

import { Center } from ".";

describe("<Center />", () => {
  it("renders", () => {
    render(<Center>my-text</Center>);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
