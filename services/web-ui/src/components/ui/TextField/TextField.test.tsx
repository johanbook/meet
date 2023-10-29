import { render, screen } from "src/test";

import { TextField } from ".";

describe("<TextField />", () => {
  it("renders", () => {
    render(
      <TextField label="my-label" onChange={jest.fn()} value="my-value" />
    );
    const textField = screen.getByRole("textbox", { name: "my-label" });
    expect(textField).toBeInTheDocument();
  });
});
