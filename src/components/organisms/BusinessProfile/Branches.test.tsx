import { render, screen } from "@testing-library/react";
import Branches from "./Branches";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));
describe("Branches Component", () => {
  it("renders branch name when provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("Branch 1")).toBeDefined();
    expect(screen.queryByText("Not available")).toBeNull();
  });
  it("renders 'Not available' when branch name is not provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("Not available")).toBeDefined();
  });
  it("renders phone when provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("123-456-7890")).toBeDefined();
    expect(screen.queryByText("Not available")).toBeNull();
  });
  it("renders 'Not available' when phone is not provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("Not available")).toBeDefined();
  });
  it("renders email when provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("branch1@example.com")).toBeDefined();
    expect(screen.queryByText("Not available")).toBeNull();
  });
  it("renders city name when provided", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("City 1")).toBeDefined();
  });

  it("renders branch ID in the footer", () => {
    const branches = [
      {
        id: 1,
        branch_name: "Branch 1",
        phone: "123-456-7890",
        email: "branch1@example.com",
        city: { name_en: "City 1" },
      },
    ];
    render(<Branches branches={branches} />);
    expect(screen.getByText("Branch ID: 1")).toBeDefined();
  });
});
