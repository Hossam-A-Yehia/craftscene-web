import { render, screen, fireEvent } from "@testing-library/react";
import UpdateBusinessProfileTemplate from "./UpdateBusinessProfileTemplate";
import React from "react";
import { expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "../../../context/UserContext";

vi.mock("@/components/organisms/UpdateBusinessForm/UpdateBusinessForm", () => ({
  default: () => (
    <div data-testid="update-business-form">Update Business Form</div>
  ),
}));

const queryClient = new QueryClient();

describe("UpdateBusinessProfileTemplate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <UpdateBusinessProfileTemplate />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByTestId("title")).toBeDefined();
    expect(screen.getByTestId("info")).toBeDefined();
    expect(screen.getByTestId("categories")).toBeDefined();
    expect(screen.getByTestId("services")).toBeDefined();

    expect(screen.getByTestId("info")).toBeDefined();
    expect(screen.getByTestId("info")).toHaveClass("bg-orange-500");
  });

  it("switches to the Categories tab when clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <UpdateBusinessProfileTemplate />
        </UserProvider>
      </QueryClientProvider>
    );

    const categoriesTab = screen.getByTestId("categories");

    fireEvent.click(categoriesTab);
    expect(categoriesTab).toHaveClass("bg-orange-500");
    const businessInfoTab = screen.getByTestId("info");
    expect(businessInfoTab).not.toHaveClass("bg-orange-500");
    expect(screen.getByTestId("categories")).toBeDefined();
  });

  it("switches to the Services tab when clicked", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <UpdateBusinessProfileTemplate />
        </UserProvider>
      </QueryClientProvider>
    );
    const servicesTab = screen.getByTestId("services");
    fireEvent.click(servicesTab);
    expect(servicesTab).toHaveClass("bg-orange-500");
    const businessInfoTab = screen.getByTestId("info");
    expect(businessInfoTab).not.toHaveClass("bg-orange-500");
    expect(screen.getByTestId("services")).toBeDefined();
  });

  it("renders the UpdateBusinessForm when the Business Info tab is active", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <UpdateBusinessProfileTemplate />
        </UserProvider>
      </QueryClientProvider>
    );
    expect(screen.getByTestId("update-business-form")).toBeDefined();
  });
});
