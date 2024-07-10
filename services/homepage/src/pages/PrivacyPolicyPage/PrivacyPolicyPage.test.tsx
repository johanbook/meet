import { render, screen } from "src/test";

import { PrivacyPolicyPage } from "./PrivacyPolicyPage";

describe("<PrivacyPolicyPage />", () => {
  it("renders", () => {
    render(<PrivacyPolicyPage />);
    const text = screen.getByText(/Version/);
    expect(text).toBeInTheDocument();
  });
});
