import React from "react";
import { describe, it, expect, vi } from "vitest";
import JobBank from "./JobBank";
import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchbusinessUsers } from "../../../hooks/useUser";
import { useFetchServices } from "../../../hooks/useServices";

vi.mock("@/hooks/useUser", () => ({
  useFetchbusinessUsers: vi.fn(() => ({
    data: { payload: { data: [], last_page: 1 } },
    isLoading: false,
    error: null,
  })),
  useFetchFilterProfessionals: vi.fn(() => ({
    data: { payload: { results: { data: [], last_page: 1 } } },
  })),
}));

vi.mock("@/hooks/useServices", () => ({
  useFetchServices: vi.fn(() => ({
    data: { payload: { data: [] } },
    isLoading: false,
    error: null,
  })),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(() => "en"),
}));

vi.mock("i18next", () => ({
  t: vi.fn((key) => key),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return {
    ...render(
      <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
    ),
    testQueryClient,
  };
};

describe("JobBank Component", () => {
  it("renders Loader when isLoading is true", () => {
    vi.mocked(useFetchbusinessUsers as any).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    const { getByTestId } = renderWithClient(
      <JobBank categoriesData={undefined} />
    );
    const loaderWrapper = getByTestId("loader-wrapper");
    expect(loaderWrapper).toBeDefined();
  });

  it("renders NoData when there is no data and no error", () => {
    vi.mocked(useFetchbusinessUsers as any).mockReturnValue({
      data: { payload: { data: [] } },
      isLoading: false,
      error: null,
    });

    const { getByTestId } = renderWithClient(
      <JobBank categoriesData={undefined} />
    );
    const noDataWrapper = getByTestId("no-data");
    expect(noDataWrapper).toBeDefined();
  });

  it("renders ErrorMessage when there is an error", () => {
    vi.mocked(useFetchbusinessUsers as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error occurred",
    });

    vi.mocked(useFetchServices as any).mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error occurred",
    });

    const { getByTestId } = renderWithClient(
      <JobBank categoriesData={undefined} />
    );
    const errorMessage = getByTestId("error-message");
    expect(errorMessage).toBeDefined();
  });

  it("renders Pagination when data is present", () => {
    vi.mocked(useFetchbusinessUsers as any).mockReturnValue({
      data: { payload: { data: [{ id: 1 }], last_page: 2 } },
      isLoading: false,
      error: null,
    });

    const { getByTestId } = renderWithClient(
      <JobBank categoriesData={undefined} />
    );
    const paginationWrapper = getByTestId("pagination");
    expect(paginationWrapper).toBeDefined();
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
});
