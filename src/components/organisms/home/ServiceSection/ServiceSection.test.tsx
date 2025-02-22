import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import OurService from "./ServiceSection";

vi.mock("i18next", () => ({
  t: vi.fn((key: string) => key),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("OurService Component", () => {
  it("renders the shared title", () => {
    render(<OurService />);
    const title = screen.getByText("home.services.title");
    expect(title).toBeInTheDocument();
  });

  it("renders all service cards", () => {
    render(<OurService />);
    const cards = screen.getAllByRole("img");
    expect(cards).toHaveLength(4);
  });

  const mockServices = [
    {
      title: "home.services.card1.title",
      description: "home.services.card1.desc",
      link: "/",
      image: "/mock-image1.png",
    },
    {
      title: "home.services.card2.title",
      description: "home.services.card2.desc",
      link: "/",
      image: "/mock-image2.png",
    },
    {
      title: "home.services.card3.title",
      description: "home.services.card3.desc",
      link: "/",
      image: "/mock-image3.png",
    },
    {
      title: "home.services.card4.title",
      description: "home.services.card4.desc",
      link: "/",
      image: "/mock-image4.png",
    },
  ];

  it("renders service titles and descriptions", () => {
    render(<OurService />);
    mockServices.forEach((service) => {
      const title = screen.getByText(service.title);
      const description = screen.getByText(service.description);
      expect(title).toBeInTheDocument();
      expect(description).toBeInTheDocument();
    });
  });

  it("renders the 'See More' links", () => {
    render(<OurService />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(4);
    links.forEach((link) => {
      expect(link).toHaveTextContent("home.services.see_more");
    });
  });
});
