import { describe, expect, it, render, screen, userEvent, vi } from "src/test";

import { TextField } from ".";

describe("<TextField />", () => {
  it("renders", () => {
    render(<TextField label="my-label" onChange={vi.fn()} value="my-value" />);
    const textField = screen.getByRole("textbox", { name: "my-label" });
    expect(textField).toBeInTheDocument();
  });

  it("respects max length", async () => {
    const onChange = vi.fn();
    render(
      <TextField
        label="my-label"
        onChange={onChange}
        maxLength={5}
        value="12345"
      />,
    );
    const textField = screen.getByRole("textbox", { name: "my-label" });
    expect(textField).toHaveAttribute("maxlength", "5");

    await userEvent.type(textField, "hello");

    // Callback not triggered when value is over limit
    expect(onChange).toHaveBeenCalledTimes(0);
  });

  it("calls onChange when typing", async () => {
    const onChange = vi.fn();
    render(<TextField label="my-label" onChange={onChange} value="" />);
    const textField = screen.getByRole("textbox", { name: "my-label" });

    await userEvent.type(textField, "hello");

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenLastCalledWith("o");
  });
});
