import React from "react";
import { render, screen } from "@testing-library/react";
import { useLanguage } from "../../../hooks/useLanguage";
import ProjectGrid from "./ProjectGrid";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";
import { expect, vi } from "vitest";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));
describe("ProjectGrid Component", () => {
  beforeEach(() => {
    (useLanguage as any).mockReturnValue("en");
    (useRouter as any).mockReturnValue({ push: vi.fn() });
  });
  it("renders the correct number of projects", () => {
    const projects: any[] = [
      { id: "1", title_en: "Project One", images: [{ url: "/image1.png" }] },
      { id: "2", title_en: "Project Two", images: [{ url: "/image2.png" }] },
    ];
    render(<ProjectGrid projects={projects} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
  it("constructs the correct links for each project", () => {
    const projects: any[] = [
      { id: "1", title_en: "Project One", images: [{ url: "/image1.png" }] },
      { id: "2", title_en: "Project Two", images: [{ url: "/image2.png" }] },
    ];
    render(<ProjectGrid projects={projects} />);
    expect(screen.getByRole("link", { name: /Project One/i })).toHaveAttribute(
      "href",
      "/projects/1"
    );
    expect(screen.getByRole("link", { name: /Project Two/i })).toHaveAttribute(
      "href",
      "/projects/2"
    );
  });
});
