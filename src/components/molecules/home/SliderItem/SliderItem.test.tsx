import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import SliderItem from "./SliderItem";
import React from "react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("SliderItem Component", () => {
  it("renders the image correctly", () => {
    render(
      <SliderItem
        imageUrl="https://example.com/image.jpg"
        altText="Example Image"
      />
    );

    const imageElement = screen.getByAltText("Example Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute(
      "src",
      "https://example.com/image.jpg"
    );
  });

  it("applies the correct class to the container", () => {
    render(
      <SliderItem
        imageUrl="https://example.com/image.jpg"
        altText="Example Image"
      />
    );

    const container = screen.getByAltText("Example Image").parentElement;
    expect(container).toHaveClass("swiper-slide");
  });

  it("renders the correct alt text for the image", () => {
    render(
      <SliderItem
        imageUrl="https://example.com/image.jpg"
        altText="Example Image"
      />
    );

    const imageElement = screen.getByAltText("Example Image");
    expect(imageElement).toHaveAttribute("alt", "Example Image");
  });
});
