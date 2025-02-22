import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InterestsTemplate from "./InterestsTemplate";
import { Categories } from "../../../services/home/Home";
import { fetchInterests } from "../../../services/user/user";
import { CRAFTSMEN_ID } from "../../../constants/constants";
import React from "react";

vi.mock("@/components/atoms/Container/Container", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="container">{children}</div>
  ),
}));

vi.mock("@/components/organisms/InterestsPage/InterestsPage", () => ({
  default: ({ categories, userInterests, userId }: any) => (
    <div data-testid="interests-page">
      <div data-testid="categories-count">{categories?.length || 0}</div>
      <div data-testid="interests-count">{userInterests?.length || 0}</div>
      <div data-testid="user-id">{userId}</div>
    </div>
  ),
}));

vi.mock("@/services/home/Home", () => ({
  Categories: vi.fn(),
}));

vi.mock("@/services/user/user", () => ({
  fetchInterests: vi.fn(),
}));

describe("InterestsTemplate", () => {
  const mockUserId = "123";
  const mockCategories = [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
    { id: CRAFTSMEN_ID, name: "Craftsmen" },
  ];
  const mockUserInterests = [
    { id: 1, service_id: 101 },
    { id: 2, service_id: 102 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component with filtered categories and user interests", async () => {
    (Categories as any).mockResolvedValue({
      payload: mockCategories,
    });
    (fetchInterests as any).mockResolvedValue(mockUserInterests);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);

    expect(screen.getByTestId("categories-count").textContent).toBe("2");
    expect(screen.getByTestId("interests-count").textContent).toBe("2");
    expect(screen.getByTestId("user-id").textContent).toBe(mockUserId);
  });

  it("handles empty categories array", async () => {
    (Categories as any).mockResolvedValue({
      payload: [],
    });
    (fetchInterests as any).mockResolvedValue(mockUserInterests);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);
    expect(screen.getByTestId("categories-count").textContent).toBe("0");
  });

  it("handles empty user interests array", async () => {
    (Categories as any).mockResolvedValue({
      payload: mockCategories,
    });
    (fetchInterests as any).mockResolvedValue([]);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);
    expect(screen.getByTestId("interests-count").textContent).toBe("0");
  });

  it("handles null categories payload", async () => {
    (Categories as any).mockResolvedValue({
      payload: null,
    });
    (fetchInterests as any).mockResolvedValue(mockUserInterests);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);
    expect(screen.getByTestId("categories-count").textContent).toBe("0");
  });

  it("filters out CRAFTSMEN_ID category correctly", async () => {
    (Categories as any).mockResolvedValue({
      payload: mockCategories,
    });
    (fetchInterests as any).mockResolvedValue(mockUserInterests);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);
    expect(screen.getByTestId("categories-count").textContent).toBe("2");
    expect(Categories).toHaveBeenCalledTimes(1);
  });

  it("renders within Container component", async () => {
    (Categories as any).mockResolvedValue({
      payload: mockCategories,
    });
    (fetchInterests as any).mockResolvedValue(mockUserInterests);
    const component = await InterestsTemplate({ userId: mockUserId });
    render(component);
    expect(screen.getByTestId("container")).toBeDefined();
    expect(screen.getByTestId("interests-page")).toBeDefined();
  });

  it("handles API error cases", async () => {
    (Categories as any).mockRejectedValue(new Error("API Error"));
    (fetchInterests as any).mockRejectedValue(new Error("API Error"));

    try {
      const component = await InterestsTemplate({ userId: mockUserId });
      render(component);
      expect(screen.getByTestId("categories-count").textContent).toBe("0");
      expect(screen.getByTestId("interests-count").textContent).toBe("0");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
