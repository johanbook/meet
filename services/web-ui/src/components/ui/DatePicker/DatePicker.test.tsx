import { render, screen } from "src/test";

import { DatePicker } from ".";

describe("<DatePicker />", () => {
  it("renders", () => {
    render(<DatePicker onChange={jest.fn()} value={new Date()} />);
    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
