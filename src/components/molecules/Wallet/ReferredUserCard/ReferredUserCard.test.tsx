import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ReferredUserCard from "./ReferredUserCard";
import React from "react";

vi.mock("@/utils/generalUtils", () => ({
  formatDate: vi.fn(() => ({
    formattedDate: "Jan 1, 2024",
    formattedTime: "10:00 AM",
  })),
}));

describe("ReferredUserCard Component", () => {
  it("renders the ReferredUserCard component with the given name and formatted date", () => {
    const mockName = "John Doe";
    const mockDate = "2024-01-01T10:00:00Z";

    render(<ReferredUserCard name={mockName} date={mockDate} />);

    const nameElement = screen.getByText(mockName);
    expect(nameElement).toBeDefined();

    const formattedDateElement = screen.getByText("Jan 1, 2024");
    const formattedTimeElement = screen.getByText("10:00 AM");
    expect(formattedDateElement).toBeDefined();
    expect(formattedTimeElement).toBeDefined();

    const avatar = screen.getByAltText(`${mockName}'s Avatar`);
    expect(avatar).toBeDefined();
  });
});
