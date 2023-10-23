import { render } from "src/test";

import { DatePicker } from ".";

describe("<DatePicker />", () => {
  it("renders", () => {
    render(<DatePicker label="Date" onChange={jest.fn()} value={new Date()} />);
  });
});
