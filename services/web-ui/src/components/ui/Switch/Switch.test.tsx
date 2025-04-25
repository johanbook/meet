import { describe, it, expect, vi, render, screen } from "src/test";

import { Switch } from ".";

describe("<Switch />", () => {
  it("renders", () => {
    const handleChange = vi.fn();
    render(<Switch onChange={handleChange} value={false} />);

    const component = screen.getByRole("checkbox");
    expect(component).toBeInTheDocument();
  });
});
