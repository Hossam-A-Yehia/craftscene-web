import { render } from "@testing-library/react";
import JobBankCard from "./JobBankCard";
import { File } from "../../../types/User";
import React from "react";
import { expect } from "vitest";

const mockFiles: File[] = [
  {
    id: 1,
    url: "https://example.com/cv.pdf",
    type: 1,
    name: "resume.pdf",
    created_at: "",
    updated_at: "",
  },
];

describe("JobBankCard", () => {
  it("renders correctly with required props", () => {
    const { getByText, getByAltText, getByTestId } = render(
      <JobBankCard
        id={1}
        profileImage="/profile.jpg"
        name="Company Name"
        files={mockFiles}
        logo="/logo.jpg"
      />
    );
    expect(getByText("Company Name")).toBeDefined();
    const logoImage = getByAltText("Company Name's logo");
    expect(logoImage).toHaveAttribute("src");
    expect(getByAltText("Profile Cover")).toHaveAttribute("src");
    expect(getByText("PDF")).toBeDefined();
    expect(getByTestId("Download CV")).toBeDefined();
  });

  it("renders 'No Resume' when there is no CV file", () => {
    const { queryByTestId } = render(
      <JobBankCard
        id={1}
        profileImage="/profile.jpg"
        name="Company Name"
        files={[]}
        logo="/logo.jpg"
      />
    );

    expect(queryByTestId("No resume")).toBeDefined();
    expect(queryByTestId("Download CV")).toBeNull();
  });

  it("renders the download link when a CV is available", () => {
    const { getByLabelText } = render(
      <JobBankCard
        id={1}
        profileImage="/profile.jpg"
        name="Company Name"
        files={mockFiles}
        logo="/logo.jpg"
      />
    );
    const downloadLink = getByLabelText("Download Company Name's CV");
    expect(downloadLink).toBeDefined();
    expect(downloadLink).toHaveAttribute("href", "https://example.com/cv.pdf");
    expect(downloadLink).toHaveAttribute("download");
  });

  it("truncates the name if it exceeds 25 characters", () => {
    const { container } = render(
      <JobBankCard
        id={1}
        profileImage="/profile.jpg"
        name="A Very Long Company Name That Will Be Truncated"
        files={mockFiles}
        logo="/logo.jpg"
      />
    );
    const textElement = container.querySelector(".truncate");
    expect(textElement?.textContent).toBe("A Very Long Company Name ...");
  });

  it("renders default images when profileImage and logo are not provided", () => {
    const { getByAltText } = render(
      <JobBankCard
        id={1}
        profileImage=""
        name="Company Name"
        files={mockFiles}
        logo=""
      />
    );

    expect(getByAltText("Profile Cover").getAttribute("src")).toMatch(
      /_next\/image\?url=%2Fdefault.png/
    );
    expect(getByAltText("Company Name's logo").getAttribute("src")).toMatch(
      /_next\/image\?url=%2Fdefault.png/
    );
  });
});
