import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ProfessionalCard from "./ProfessionalCard";
import React from "react";

vi.mock("@/components/atoms/Image/CustomImage", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

vi.mock("@/components/atoms/Button/Button", () => ({
  __esModule: true,
  default: ({ children, ...props }: { children: React.ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

describe("ProfessionalCard Component", () => {
  const mockProps = {
    image: "/background-image.jpg",
    profileImage: "/profile-image.jpg",
    name: "John Doe",
    location: "New York, USA",
    id: "12345",
  };

  it("renders the background image correctly", () => {
    render(<ProfessionalCard {...mockProps} />);
    const backgroundImage = screen.getByAltText("Professional background");
    expect(backgroundImage).toBeInTheDocument();
    expect(backgroundImage).toHaveAttribute("src", "/background-image.jpg");
  });

  it("renders the profile image correctly", () => {
    render(<ProfessionalCard {...mockProps} />);
    const profileImage = screen.getByAltText("Profile");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveAttribute("src", "/profile-image.jpg");
  });

  it("displays the location correctly", () => {
    render(<ProfessionalCard {...mockProps} />);
    const locationElement = screen.getByText("New York, USA");
    expect(locationElement).toBeInTheDocument();
  });

  it("navigates to the correct profile link", () => {
    render(<ProfessionalCard {...mockProps} />);
    const viewProfileLink = screen.getByTestId("view-profile-link");
    expect(viewProfileLink).toHaveAttribute("href", "/business-user/12345");
  });

  it("renders the action buttons", () => {
    render(<ProfessionalCard {...mockProps} />);
    const heartButtonTestId = screen.getByTestId("heart-button");
    const phoneButtonTestId = screen.getByTestId("phone-button");
    const mailButtonTestId = screen.getByTestId("mail-button");
    expect(heartButtonTestId).toBeInTheDocument();
    expect(phoneButtonTestId).toBeInTheDocument();
    expect(mailButtonTestId).toBeInTheDocument();
  });
});
