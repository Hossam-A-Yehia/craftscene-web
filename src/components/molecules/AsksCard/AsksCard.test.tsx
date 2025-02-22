import { render, screen } from "@testing-library/react";
import AsksCard from "./AsksCard";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("next/link", () => {
  return {
    default: ({
      children,
      href,
    }: {
      children: React.ReactNode;
      href: string;
    }) => <a href={href}>{children}</a>,
  };
});

describe("AsksCard Component", () => {
  const defaultProps = {
    id: 1,
    title: "Test Subject",
    createdAt: "2023-10-01T10:00:00Z",
    isInvitation: false,
    service: "Test Service",
    category: "Test Category",
  };

  it("renders the component with all props", () => {
    render(<AsksCard {...defaultProps} />);
    expect(screen.getByTestId("ask-card")).toBeDefined();
    expect(screen.getByTestId("asks-title")).toBeDefined();
    expect(screen.getByTestId("asks-category")).toBeDefined();
    expect(screen.getByTestId("asks-Service")).toBeDefined();
    expect(screen.getByTestId("creation-date")).toBeDefined();
    expect(screen.getByTestId("arrow-icon")).toBeDefined();
  });

  it("renders the correct link based on isInvitation prop", () => {
    const { rerender } = render(<AsksCard {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/asks/1");
    rerender(<AsksCard {...defaultProps} isInvitation={true} />);
    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/received-asks/1"
    );
  });
});
