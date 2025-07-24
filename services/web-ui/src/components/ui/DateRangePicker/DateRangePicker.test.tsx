import { describe, it, render, vi } from "src/test";

import { DateRangePicker } from ".";

describe("<DateRangePicker />", () => {
  it("renders", () => {
    render(
      <DateRangePicker
        onChange={vi.fn()}
        value={{ from: new Date(), to: new Date() }}
      />,
    );
  });
});
