import React from "react";
import { render, screen } from "@testing-library/react";
import AddBranchForm from "./AddBranchForm";
import { useMutateAddBranch } from "../../../hooks/useBranches";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, it, expect, vi } from "vitest";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/hooks/useBranches");
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

const mockMutateAsync = vi.fn();
const mockRouterPush = vi.fn();
const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
};

describe("AddBranchForm", () => {
  beforeEach(() => {
    (useMutateAddBranch as any).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
      error: null,
    });
    (useRouter as any).mockReturnValue({
      push: mockRouterPush,
    });
    vi.clearAllMocks();
  });

  it("renders all form fields and the submit button", () => {
    renderWithProviders(<AddBranchForm userId="123" />);
    expect(screen.getByTestId("country-branch")).toBeDefined();
    expect(screen.getByTestId("branch_name")).toBeDefined();
    expect(screen.getByTestId("phone-branch")).toBeDefined();
    expect(screen.getByTestId("city-branch")).toBeDefined();
    expect(screen.getByTestId("email-branch")).toBeDefined();
    expect(screen.getByTestId("postCode-branch")).toBeDefined();
    expect(screen.getByTestId("submit-button")).toBeDefined();
  });
});
