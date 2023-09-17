import { render, screen } from "src/test";

import { Menu } from ".";

describe("<Menu />", () => {
  it("renders", () => {
    render(
      <Menu
        Button={({ onClick }) => <button onClick={onClick}> Button</button>}
      >
        my-content
      </Menu>
    );

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
