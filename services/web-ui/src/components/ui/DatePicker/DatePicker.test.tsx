import { describe, it, render, vi } from "src/test";

import { DatePicker } from ".";

describe("<DatePicker />", () => {
  it("renders", () => {
    render(<DatePicker label="Date" onChange={vi.fn()} value={new Date()} />);
  });
});
