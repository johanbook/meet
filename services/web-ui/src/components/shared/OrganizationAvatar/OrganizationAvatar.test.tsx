import { describe, expect, it, render, screen } from "src/test";

import { OrganizationAvatar } from ".";

describe("<OrganizationAvatar />", () => {
  it("renders organization initial in uppercase if missing image", () => {
    render(<OrganizationAvatar name="test" />);

    const label = screen.getByText("T");
    expect(label).toBeInTheDocument();
  });

  it("renders image if available", () => {
    const { container } = render(
      <OrganizationAvatar src="https://example.com" />,
    );

    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
  });

  it("renders svg if no image or name", () => {
    const { container } = render(<OrganizationAvatar />);

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
