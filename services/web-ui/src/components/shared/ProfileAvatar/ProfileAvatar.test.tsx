import { describe, expect, it, render, screen } from "src/test";

import { ProfileAvatar } from ".";

describe("<ProfileAvatar />", () => {
  it("renders profile initial in uppercase if missing image", () => {
    render(<ProfileAvatar name="test" />);

    const label = screen.getByText("T");
    expect(label).toBeInTheDocument();
  });

  it("renders image if available", () => {
    const { container } = render(<ProfileAvatar src="https://example.com" />);

    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
  });

  it("renders svg if no image or name", () => {
    const { container } = render(<ProfileAvatar />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
