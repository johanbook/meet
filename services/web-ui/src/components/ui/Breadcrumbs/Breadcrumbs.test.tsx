import Breadcrumbs from ".";
import { TestRouter, render, screen } from "../../../test";

describe("<Breadcrumbs />", () => {
  it("renders", () => {
    render(
      <TestRouter>
        <Breadcrumbs
          createLink={() => ""}
          links={["my-first-link", "my-second-link"]}
          root="/"
        />
      </TestRouter>
    );
    const breadcrumb = screen.getByRole("navigation", { name: "breadcrumb" });
    expect(breadcrumb).toBeInTheDocument();
  });
});
