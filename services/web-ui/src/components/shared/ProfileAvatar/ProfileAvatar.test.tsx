import { describe, expect, it, render, screen } from "src/test";

import { ProfileAvatar } from ".";

describe("<ProfileAvatar />", () => {
  it("renders profile initial in uppercase if missing image", () => {
    render(<ProfileAvatar name="test" />);

    const label = screen.getByText("T");
    expect(label).toBeInTheDocument();
  });
});
