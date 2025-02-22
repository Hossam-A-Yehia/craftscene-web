import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ServiceCard from "./ServiceCard";
import { useLanguage } from "../../../hooks/useLanguage";
import React from "react";
vi.mock("../../../hooks/useLanguage", () => ({
  useLanguage: vi.fn().mockImplementation(() => "en"),
}));

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe("ServiceCard Component", () => {
  const mockService = {
    id: "1",
    service: {
      images: [{ url: "/service-image.jpg" }],
      name_en: "Service Name in English",
      name_fr: "Service Name in French",
    },
  };

  beforeEach(() => {
    (useLanguage as any).mockImplementation(() => "en");
  });
  it("renders the correct image src and alt text", () => {
    render(<ServiceCard service={mockService} />);
    const imageElement = screen.getByAltText("Service Name in English");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/service-image.jpg");
  });

  it("renders the correct service name based on language", () => {
    render(<ServiceCard service={mockService} />);
    expect(screen.getByText("Service Name in English")).toBeInTheDocument();
  });

  it("renders the default image when no image is provided", () => {
    const mockServiceWithoutImage = {
      id: "1",
      service: {
        images: [],
        name_en: "Service Name in English",
        name_fr: "Service Name in French",
      },
    };

    render(<ServiceCard service={mockServiceWithoutImage} />);
    const imageElement = screen.getByAltText("Service Name in English");
    expect(imageElement).toHaveAttribute("src", "/default.png");
  });
});
