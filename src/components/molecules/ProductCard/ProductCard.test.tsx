import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ProductCard from "./ProductCard";
import React from "react";
vi.mock("@/components/atoms/Image/CustomImage", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("@/components/atoms/NavLink/NavLink", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    classN,
  }: {
    href: string;
    children: React.ReactNode;
    classN: string;
  }) => (
    <a href={href} className={classN}>
      {children}
    </a>
  ),
}));

describe("ProductCard Component", () => {
  const mockProps = {
    imageUrl: "/test-image.jpg",
    altText: "Test Product",
    link: "/test-link",
    title: "Test Product Title",
    supplier: "Test Supplier",
  };

  it("renders the product image with correct alt text", () => {
    render(<ProductCard {...mockProps} />);
    const imageElement = screen.getByAltText("Test Product");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "/test-image.jpg");
  });

  it("renders the product title", () => {
    render(<ProductCard {...mockProps} />);
    const titleElement = screen.getByText("Test Product Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass(
      "text-sm font-semibold text-gray-800 truncate"
    );
  });

  it("renders the supplier text", () => {
    render(<ProductCard {...mockProps} />);
    const supplierElement = screen.getByText("Supplier: Test Supplier");
    expect(supplierElement).toBeInTheDocument();
    expect(supplierElement).toHaveClass("text-sm text-gray-500 mt-1");
  });

  it("navigates to the correct link when clicked", () => {
    render(<ProductCard {...mockProps} />);
    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });
});
