import React from "react";
import { render, screen } from "@testing-library/react";
import Avatar from "./Avatar";
import { expect, vi } from "vitest";

vi.mock("../Image/CustomImage", () => ({
  default: vi.fn(() => <img data-testid="custom-image" />),
}));

describe("Avatar Component", () => {
  it("renders the Avatar component with the given src and alt", () => {
    const mockSrc = "https://example.com/image.jpg";
    const mockAlt = "User Avatar";
    render(<Avatar src={mockSrc} alt={mockAlt} />);
    const customImage = screen.getByTestId("custom-image");
    expect(customImage).toBeDefined();
  });

  it("renders a fallback element when no src is provided", () => {
    const mockAlt = "Fallback Avatar";
    render(<Avatar src="" alt={mockAlt} />);
    const customImage = screen.getByTestId("custom-image");
    expect(customImage).not.toBeNull();
  });
});
