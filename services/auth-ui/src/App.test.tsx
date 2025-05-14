import { describe, it } from "vitest";

import { App } from "./App";
import { render, screen } from "./test";

describe("<App />", () => {
  it("renders", () => {
    render(<App />);

    const progressBar = screen.getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });
});
