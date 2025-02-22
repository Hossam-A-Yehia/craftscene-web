import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PhoneNumber from "./PhoneNumber";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/atoms/Text/Text", () => ({
  default: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="text" className={className}>
      {children}
    </div>
  ),
}));

describe("PhoneNumber Component", () => {
  it("renders loader when isLoading is true", () => {
    render(<PhoneNumber phone={1234567890} isLoading={true} />);

    expect(screen.getByTestId("loader")).toBeDefined();
    expect(screen.queryByTestId("phone-container")).toBeNull();
  });

  it("renders phone number when not loading", () => {
    const phoneNumber = 1234567890;
    render(<PhoneNumber phone={phoneNumber} isLoading={false} />);

    const textElement = screen.getByTestId("text");
    expect(textElement).toBeDefined();
    expect(textElement).toHaveTextContent(phoneNumber.toString());
    expect(textElement).toHaveClass("text-gray-700", "text-lg");
  });
});
