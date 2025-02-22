import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import BranchesTemplate from "./BranchesTemplate";
import { useFetchBranches } from "../../../hooks/useBranches";
import { Branches } from "../../../types/Branches";
import React from "react";

vi.mock("@/hooks/useBranches", () => ({
  useFetchBranches: vi.fn(),
}));
vi.mock("i18next", () => ({
  t: (key: string) => key,
}));
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));
vi.mock("@/components/molecules/BranchCard/BranchCard", () => ({
  __esModule: true,
  default: ({ branch }: { branch: Branches }) => (
    <div data-testid="branch-card">{branch.branch_name}</div>
  ),
}));
vi.mock("@/components/molecules/NoDate/NoDate", () => ({
  __esModule: true,
  default: () => <div data-testid="no-data">No Data</div>,
}));

describe("BranchesTemplate", () => {
  const userIdMock = "123";
  const mockBranches = [
    {
      id: 1,
      branch_name: "Branch 1",
      city: { name_en: "City 1" },
      phone: "123-456",
    },
    {
      id: 2,
      branch_name: "Branch 2",
      city: { name_en: "City 2" },
      phone: "789-012",
    },
  ];

  beforeEach(() => {
    (useFetchBranches as any).mockReturnValue({ data: mockBranches });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly with branches", () => {
    render(<BranchesTemplate userId={userIdMock} />);
    expect(screen.getByText("branches.branches")).toBeDefined();
    expect(screen.getByText("branches.desc")).toBeDefined();
    expect(screen.getAllByTestId("branch-card")).toHaveLength(
      mockBranches.length
    );
    expect(screen.getByText(mockBranches[0].branch_name)).toBeDefined();
    expect(screen.getByText(mockBranches[1].branch_name)).toBeDefined();
  });

  it("renders the NoData component when there are no branches", () => {
    (useFetchBranches as any).mockReturnValue({ data: [] });
    render(<BranchesTemplate userId={userIdMock} />);
    expect(screen.getByTestId("noData")).toBeDefined();
  });

  it("renders the 'Add Branch' button with the correct link", async () => {
    render(<BranchesTemplate userId={userIdMock} />);
    const addBranchButton = screen.getByTestId("add-branch");
    expect(addBranchButton).toBeDefined();
    expect(addBranchButton).toHaveTextContent("branches.add_branch");

    const linkElement = addBranchButton.closest("a");
    expect(linkElement).toHaveAttribute("href", `/add-branch/${userIdMock}`);
  });
});
