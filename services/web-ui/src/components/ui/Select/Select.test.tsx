import { MenuItem } from "@mui/material";

import { describe, expect, it, render, screen, userEvent, vi } from "src/test";

import { Select } from ".";

describe("<Select />", () => {
  it("renders", () => {
    render(<Select label="my-label" onChange={vi.fn()} value="option1" />);
    const select = screen.getByRole("combobox", { name: "" });
    expect(select).toBeInTheDocument();
  });

  it("calls onChange when value changes", async () => {
    const onChange = vi.fn();
    render(
      <Select label="my-label" onChange={onChange} value="">
        <MenuItem key="option1" value="option1">
          Option 1
        </MenuItem>
      </Select>,
    );

    const select = screen.getByRole("combobox", { name: "" });
    expect(select).toBeInTheDocument();
    await userEvent.click(select);

    const item = screen.getByRole("option", { name: "Option 1" });
    expect(item).toBeInTheDocument();
    await userEvent.click(item);

    expect(onChange).toHaveBeenCalledWith("option1");
  });
});
