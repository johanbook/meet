import { describe, expect, it, render, screen, vi } from "src/test";

import { TextField } from ".";

describe("<TextField />", () => {
  it("renders", () => {
    render(<TextField label="my-label" onChange={vi.fn()} value="my-value" />);
    const textField = screen.getByRole("textbox", { name: "my-label" });
    expect(textField).toBeInTheDocument();
  });
});
