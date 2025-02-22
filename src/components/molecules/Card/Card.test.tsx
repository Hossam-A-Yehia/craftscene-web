import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import Card from "./Card";

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

describe("Card Component", () => {
  const mockProps = {
    imageUrl: "/test-image.jpg",
    altText: "Test Image",
    link: "/test-link",
  };

  it("renders the image with correct styles and alt text", () => {
    render(<Card {...mockProps} />);
    const imageElement = screen.getByAltText("Test Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveClass(
      "hover:rotate-2 hover:scale-110 duration-300"
    );
  });

  it("renders a link with the correct href attribute", () => {
    render(<Card {...mockProps} />);
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });

  it("navigates to the correct link when clicked", () => {
    render(<Card {...mockProps} />);
    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);
    expect(linkElement).toHaveAttribute("href", "/test-link");
  });
});
