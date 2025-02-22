import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import InterestsPage from "./InterestsPage";
import { toast } from "react-toastify";
import { useMutateEditInterests } from "../../../hooks/useUser";
import React from "react";

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/useUser", () => ({
  useMutateEditInterests: vi.fn(),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("InterestsPage", () => {
  const mockCategories = [
    {
      id: 1,
      name_en: "Category 1",
      children: [
        {
          id: 2,
          name_en: "Subcategory 1",
          services: [
            { id: 1, name_en: "Service 1" },
            { id: 2, name_en: "Service 2" },
          ],
        },
      ],
    },
  ];

  const mockUserInterests = [{ service_id: 1 }, { service_id: 2 }];

  const mockUserId = "123";
  const mockMutateAsync = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useMutateEditInterests as any).mockReturnValue({
      mutateAsync: mockMutateAsync,
      isPending: false,
    });
  });

  it("renders correctly with initial props", () => {
    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    expect(screen.getByTestId("interests-page")).toBeDefined();
    expect(screen.getByTestId("main-categories")).toBeDefined();
    expect(screen.getByTestId("main-category-button-1")).toBeDefined();
  });

  it("toggles category sections when clicked", () => {
    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const categoryButton = screen.getByTestId("category-button-2");
    fireEvent.click(categoryButton);

    expect(screen.getByTestId("category-content-2")).toBeDefined();
    expect(screen.getByTestId("service-button-1")).toBeDefined();
    expect(screen.getByTestId("service-button-2")).toBeDefined();

    fireEvent.click(categoryButton);
    expect(screen.queryByTestId("category-content-2")).toBeNull();
  });

  it("toggles services when clicked", () => {
    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const categoryButton = screen.getByTestId("category-button-2");
    fireEvent.click(categoryButton);

    const serviceButton = screen.getByTestId("service-button-1");
    fireEvent.click(serviceButton);

    expect(serviceButton).toHaveClass("border-gray-200");
  });

  it("handles successful save", async () => {
    mockMutateAsync.mockResolvedValueOnce({});

    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalled();
      expect(toast.info).toHaveBeenCalledWith("user_interests.success_message");
    });

    const expectedServices = mockUserInterests.map((interest) => ({
      user_id: 123,
      service_id: interest.service_id,
    }));
    expect(mockMutateAsync).toHaveBeenCalledWith(expectedServices);
  });

  it("handles save error", async () => {
    const errorMessage = "Error saving interests";
    mockMutateAsync.mockRejectedValueOnce({
      response: { data: { message: errorMessage } },
    });

    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const saveButton = screen.getByTestId("save-button");
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("changes selected category when category button is clicked", () => {
    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const categoryButton = screen.getByTestId("main-category-button-1");
    fireEvent.click(categoryButton);

    expect(categoryButton).toHaveClass("bg-orange-500");
  });

  it("maintains selected services state correctly", () => {
    render(
      <InterestsPage
        categories={mockCategories}
        userInterests={mockUserInterests}
        userId={mockUserId}
      />
    );

    const categoryButton = screen.getByTestId("category-button-2");
    fireEvent.click(categoryButton);

    const service1Button = screen.getByTestId("service-button-1");
    const service2Button = screen.getByTestId("service-button-2");

    expect(service1Button).toHaveClass("border-orange-500");
    expect(service2Button).toHaveClass("border-orange-500");

    fireEvent.click(service1Button);
    expect(service1Button).toHaveClass("border-gray-200");
    expect(service2Button).toHaveClass("border-orange-500");
  });
});
