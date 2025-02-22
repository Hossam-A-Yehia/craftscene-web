import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductsImages from "./ProductsImages";
import { expect, vi } from "vitest";
import React from "react";
vi.mock("@/components/atoms/Image/CustomImage", () => ({
  __esModule: true,
  default: vi.fn(({ src, alt }) => <img src={src} alt={alt} />),
}));
describe("ProductsImages Component", () => {
  const mockVariants = [
    {
      id: 1,
      image_urls: ["/image1.jpg", "/image2.jpg", "/image3.jpg"],
    },
  ];
  it("renders correctly when images are provided", () => {
    render(<ProductsImages currentVariant={mockVariants} />);
    const slides = screen.getAllByRole("img");
    expect(slides.length).toBe(6);
    expect(slides[0]).toHaveAttribute("src", "/image1.jpg");
    expect(slides[1]).toHaveAttribute("src", "/image2.jpg");
    expect(slides[2]).toHaveAttribute("src", "/image3.jpg");
  });
  it("displays the fallback image when no images are provided", () => {
    const emptyVariants = [{ id: 1, image_urls: [] }];
    render(<ProductsImages currentVariant={emptyVariants} />);
    const fallbackImages = screen.getAllByAltText("kj");
    expect(fallbackImages.length).toBe(2);
    fallbackImages.forEach((image) => {
      expect(image).toHaveAttribute("src", "/outOfStock.jpg");
    });
  });
  it("renders thumbnails correctly", () => {
    render(<ProductsImages currentVariant={mockVariants} />);
    const thumbnails = screen.getAllByRole("img");
    expect(thumbnails.length).toBe(6);
    expect(thumbnails[3]).toHaveAttribute("src", "/image1.jpg");
  });

  it("works with empty image_urls array", () => {
    const emptyVariants = [{ id: 1, image_urls: [] }];
    render(<ProductsImages currentVariant={emptyVariants} />);
    const fallbackImages = screen.getAllByAltText("kj");
    expect(fallbackImages.length).toBe(2);
    fallbackImages.forEach((image) => {
      expect(image).toHaveAttribute("src", "/outOfStock.jpg");
    });
  });
});
