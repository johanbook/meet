import { describe, expect, it, render, screen } from "src/test";

import { OrganizationAvatar } from ".";

describe("<OrganizationAvatar />", () => {
  it("renders organization initial in uppercase if missing image", () => {
    render(<OrganizationAvatar name="test" />);

    const label = screen.getByText("T");
    expect(label).toBeInTheDocument();
  });
});
