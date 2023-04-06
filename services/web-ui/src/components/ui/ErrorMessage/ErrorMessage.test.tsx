import ErrorMessage from ".";
import { render, screen } from "../../../test";

describe("<ErrorMessage />", () => {
  it("displays error message", () => {
    render(<ErrorMessage message="my-message" />);
    const message = screen.getByText(/my-message/);
    expect(message).toBeInTheDocument();
  });
});
