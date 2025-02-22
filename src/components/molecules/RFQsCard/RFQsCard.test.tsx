import { render, screen } from "@testing-library/react";
import RFQsCard from "./RFQsCard";
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

describe("RFQsCard Component", () => {
  const defaultProps = {
    id: 1,
    status: 1,
    subject: "Test Subject",
    createdAt: "2023-10-01T10:00:00Z",
    isInvitation: false,
    service: "Test Service",
    category: "Test Category",
  };

  it("renders the component with all props", () => {
    render(<RFQsCard {...defaultProps} />);
    expect(screen.getByTestId("rfq-card")).toBeInTheDocument();
    expect(screen.getByTestId("rfqs-subject")).toBeInTheDocument();
    expect(screen.getByTestId("rfqs-category")).toBeInTheDocument();
    expect(screen.getByTestId("rfqs-Service")).toBeInTheDocument();
    expect(screen.getByTestId("creation-date")).toBeInTheDocument();
    expect(screen.getByTestId("arrow-icon")).toBeInTheDocument();
  });

  it("renders the correct link based on isInvitation prop", () => {
    const { rerender } = render(<RFQsCard {...defaultProps} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/rfqs/1");
    rerender(<RFQsCard {...defaultProps} isInvitation={true} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/invitations/1");
  });
});
