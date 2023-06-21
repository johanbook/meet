import { render } from "src/test";

import { DatePicker } from ".";

describe("<DatePicker />", () => {
  it("renders", () => {
    render(<DatePicker onChange={jest.fn()} value={new Date()} />);
  });
});
