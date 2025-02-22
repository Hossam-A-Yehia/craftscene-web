import { render, screen, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import ImageOverlay from "./ImageOverlay";

describe("ImageOverlay Component", () => {
  const mockOnClose = vi.fn();
  const testImage = "https://example.com/image.jpg";
  const testAlt = "Test Image";

  it("calls onClose when the close button is clicked", () => {
    render(
      <ImageOverlay src={testImage} alt={testAlt} onClose={mockOnClose} />
    );
    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("renders the image with the correct scaling transition", () => {
    render(
      <ImageOverlay src={testImage} alt={testAlt} onClose={mockOnClose} />
    );
    const imageContainer = screen.getByAltText(testAlt).closest("div");
    expect(imageContainer).toHaveClass("scale-100");
  });

  it("renders a close button", () => {
    render(
      <ImageOverlay src={testImage} alt={testAlt} onClose={mockOnClose} />
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
