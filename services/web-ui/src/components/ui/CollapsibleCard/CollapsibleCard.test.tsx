import { describe, expect, it, render, screen } from "src/test";

import { CollapsibleCard } from ".";

describe("<CollapsibleCard />", () => {
  it("renders", () => {
    render(<CollapsibleCard title="my-title">my-text</CollapsibleCard>);

    const header = screen.getByText(/my-title/);
    expect(header).toBeInTheDocument();

    const text = screen.getByText(/my-text/);
    expect(text).toBeInTheDocument();
  });
});
