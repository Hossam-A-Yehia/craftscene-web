import { render, screen, fireEvent } from "@testing-library/react";
import Footer from "./Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchUser } from "../../../hooks/useUser";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { expect, vi } from "vitest";
import React from "react";
import { UserProvider } from "../../../context/UserContext";

vi.mock("@/hooks/useUser", () => ({
  useFetchUser: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: { error: vi.fn() },
}));

const queryClient = new QueryClient();

describe("Footer Component", () => {
  let push;

  beforeEach(() => {
    push = vi.fn();
    (useRouter as any).mockReturnValue({ push });
    (useFetchUser as any).mockReturnValue({ data: null });
  });

  const renderWithProviders = (ui) =>
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>{ui}</UserProvider>
      </QueryClientProvider>
    );

  it("renders footer correctly", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("footer-container")).toBeDefined();
  });

  it("renders social media links", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("social-facebook")).toBeDefined();
    expect(screen.getByTestId("social-twitter")).toBeDefined();
    expect(screen.getByTestId("social-linkedin")).toBeDefined();
    expect(screen.getByTestId("social-instagram")).toBeDefined();
  });

  it("renders company section correctly", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("company-section")).toBeDefined();
  });

  it("renders services section correctly", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("services-section")).toBeDefined();
  });

  it("renders support section correctly", () => {
    renderWithProviders(<Footer />);
    expect(screen.getByTestId("support-section")).toBeDefined();
  });

  it("shows error toast when RFQ button is clicked without user", () => {
    renderWithProviders(<Footer />);

    fireEvent.click(screen.getByTestId("rfq-button"));
    expect(toast.error).toHaveBeenCalledWith("home.header.access_rfq_massage");
  });
});
