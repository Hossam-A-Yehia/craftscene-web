import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import AuthorProfile from "./AuthorProfile";
import { Idea } from "../../../../types/idea";

vi.mock("i18next", () => ({
  t: (key: string) => {
    const translations: Record<string, string> = {
      "idea.view_profile": "View Profile",
    };
    return translations[key] || key;
  },
}));
describe("AuthorProfile Component", () => {
  const mockData: Idea = {
    user: {
      business_user_detail: {
        profile: "https://example.com/profile.jpg",
        business_name: "Test Business",
      },
      id: 1,
      username: "testuser",
    },
    id: 1,
    title_en: "Test Idea",
    description_en: "This is a test idea description.",
    title_ar: "",
    description_ar: "",
    user_service_id: 1,
    user_project_id: 1,
    images: [],
    values: [],
    service: {
      name_en: "Test Service",
    },
    map: undefined,
    length: 0,
  };

  const mockProjectDetails = {
    payload: {
      id: 123,
      title_en: "Test Project",
      creation_date: "2024-12-20",
      city: {
        name_en: "Test City",
        country: { name_en: "Test Country" },
      },
    },
  };

  it("renders the profile details correctly", () => {
    render(
      <AuthorProfile data={mockData} projectDetails={mockProjectDetails} />
    );
    expect(screen.getByText(mockData.title_en)).toBeInTheDocument();
    expect(screen.getByText(mockData.service.name_en)).toBeInTheDocument();
    expect(
      screen.getByText(mockProjectDetails.payload.title_en)
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockProjectDetails.payload.creation_date)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockProjectDetails.payload.city.name_en}, ${mockProjectDetails.payload.city.country.name_en}`
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(mockData.user.business_user_detail.business_name)
    ).toBeInTheDocument();
    expect(screen.getByText(mockData.description_en)).toBeInTheDocument();
  });

  it("renders the profile image correctly", () => {
    render(
      <AuthorProfile data={mockData} projectDetails={mockProjectDetails} />
    );
    const profileImage = screen.getByAltText("bon ton logo");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage.getAttribute("src")).toContain(
      encodeURIComponent(mockData.user.business_user_detail.profile)
    );
    expect(profileImage).toHaveClass("w-full h-full object-cover");
  });
  it("renders the view profile button with the correct link", () => {
    render(
      <AuthorProfile data={mockData} projectDetails={mockProjectDetails} />
    );
    const viewProfileButton = screen.getByRole("link", {
      name: /view profile/i,
    });
    expect(viewProfileButton).toBeInTheDocument();
    expect(viewProfileButton).toHaveAttribute(
      "href",
      `/business-user/${mockData.user.id}`
    );
  });
});
