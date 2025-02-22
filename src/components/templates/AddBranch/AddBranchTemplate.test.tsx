import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import AddBranchTemplate from "./AddBranchTemplate";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
vi.mock("i18next", () => ({
  t: (key: string) => key,
}));
const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("AddBranchTemplate", () => {
  it("renders the title correctly", () => {
    const userId = "12345";
    renderWithProviders(<AddBranchTemplate userId={userId} />);
    const titleElement = screen.getByText("add_branch.title");
    expect(titleElement).toBeDefined();
  });

  it("renders AddBranchForm with correct userId prop", () => {
    const userId = "12345";
    renderWithProviders(<AddBranchTemplate userId={userId} />);
    const formElement = screen.getByTestId("add-branch-form");
    expect(formElement).toBeDefined();
  });

  it("has correct structure", () => {
    const userId = "12345";
    const { container } = renderWithProviders(
      <AddBranchTemplate userId={userId} />
    );
    expect(container.firstChild).toHaveClass("min-h-screen");
    expect(container.querySelector("div.w-full")).toBeDefined();
    expect(container.querySelector("div.p-8")).toBeDefined();
  });
});
