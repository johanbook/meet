import { describe, expect, it, render, screen } from "src/test";

import { Carousel } from ".";
import { CarouselImage } from "./Carousel";

const IMAGES: CarouselImage[] = [{ src: "example.com" }];

describe("<Carousel />", () => {
  it("renders", () => {
    render(<Carousel images={IMAGES} />);
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
  });
});
