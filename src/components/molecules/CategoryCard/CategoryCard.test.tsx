import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import CategoryCard from "./CategoryCard";
import React from "react";
vi.mock("next/link", () => {
  return {
    __esModule: true,
    default: ({
      href,
      children,
    }: {
      href: string;
      children: React.ReactNode;
    }) => <a href={href}>{children}</a>,
  };
});

describe("CategoryCard Component", () => {
  const mockProps = {
    imageUrl: "/test-image.jpg",
    name: "Test Category",
    link: "/test-link",
  };

  it("renders the image with correct alt text and styles", () => {
    render(<CategoryCard {...mockProps} />);
    const imageElement = screen.getByAltText("Test Category");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveClass(
      "object-cover mb-4 rounded-3xl duration-300 group-hover:scale-110 group-hover:rotate-2"
    );
  });

  it("renders the category name as text", () => {
    render(<CategoryCard {...mockProps} />);
    const textElement = screen.getByText("Test Category");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveClass(
      "text-xl text-white pb-8 text-center font-bold"
    );
  });

  it("renders a link with the correct href attribute", () => {
    render(<CategoryCard {...mockProps} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });

  it("navigates to the correct link when clicked", () => {
    render(<CategoryCard {...mockProps} />);
    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });
});
