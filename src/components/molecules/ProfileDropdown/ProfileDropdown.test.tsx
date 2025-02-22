import { render, fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ProfileDropdown from "./ProfileDropdown";
import { useRouter } from "next/navigation";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("js-cookie", () => ({
  remove: vi.fn(),
}));

describe("ProfileDropdown Component", () => {
  const mockRouter = { push: vi.fn() };
  const userProps = {
    userName: "John Doe",
    userTypeValue: "Client",
    userId: "12345",
    userType: 1,
    userImage: "/path/to/image.jpg",
  };

  beforeEach(() => {
    (useRouter as any).mockReturnValue(mockRouter);
  });

  it("renders correctly", () => {
    render(<ProfileDropdown {...userProps} />);

    expect(screen.getByText("John Doe")).toBeDefined();
    expect(screen.getByAltText("John Doe")).toHaveAttribute(
      "src",
      "/path/to/image.jpg"
    );
  });

  it("toggles the dropdown when clicked", () => {
    render(<ProfileDropdown {...userProps} />);

    const button = screen.getByTestId("profile-dropdown-button");
    fireEvent.click(button);
    expect(screen.getByTestId("profile-dropdown-menu")).toBeDefined();
    fireEvent.click(button);
    expect(screen.queryByTestId("profile-dropdown-menu")).toBeNull();
  });

  it("closes the dropdown when clicking outside", () => {
    render(<ProfileDropdown {...userProps} />);
    const button = screen.getByTestId("profile-dropdown-button");
    fireEvent.click(button);
    fireEvent.mouseDown(document.body);
    expect(screen.queryByTestId("profile-dropdown-menu")).toBeNull();
  });
});
