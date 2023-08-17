import { render, screen } from "src/test";

import { Switch } from ".";

describe("<Switch />", () => {
  it("renders", () => {
    const handleChange = jest.fn();
    render(<Switch onChange={handleChange} value={false} />);

    const component = screen.getByRole("checkbox");
    expect(component).toBeInTheDocument();
  });
});
