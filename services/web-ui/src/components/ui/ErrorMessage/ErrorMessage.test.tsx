import { render, screen } from "src/test";

import ErrorMessage from ".";

describe("<ErrorMessage />", () => {
  it("displays error message", () => {
    render(<ErrorMessage message="my-message" />);
    const message = screen.getByText(/my-message/);
    expect(message).toBeInTheDocument();
  });
});
