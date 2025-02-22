import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ServicesForm from "./ServicesForm";
import { Formik } from "formik";
import { UserTypeEnum } from "../../../../constants/enums/userTypeEnum";
import { useFetchServices } from "../../../../hooks/useServices";
import { useLanguage } from "../../../../hooks/useLanguage";
import { useDisclosure } from "../../../../hooks/useDisclosure";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/hooks/useServices", () => ({
  useFetchServices: vi.fn(),
}));

vi.mock("@/hooks/useDisclosure", () => ({
  useDisclosure: vi.fn(),
}));

describe("ServicesForm", () => {
  const queryClient = new QueryClient();

  it("renders loader while fetching services", () => {
    vi.mocked(useFetchServices).mockReturnValue({
      isLoading: true,
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{ categories: [], services: [] }}
          onSubmit={vi.fn()}
        >
          {(formikProps) => (
            <ServicesForm
              profile={{ user_type: UserTypeEnum.SUPPLIER }}
              formikProps={formikProps}
              setCurrentForm={vi.fn()}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders service options when data is loaded", async () => {
    const mockServices = [
      {
        category_id: 1,
        category: { name_en: "Category1", id: 1 },
        id: 2,
        name_en: "Service 1",
      },
    ];

    vi.mocked(useFetchServices).mockReturnValue({
      data: { payload: mockServices },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetched: true,
      isFetching: false,
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    vi.mocked(useDisclosure).mockReturnValue({
      isOpen: false,
      onOpen: vi.fn(),
      onClose: vi.fn(),
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{ categories: [{ value: "1" }], services: [] }}
          onSubmit={vi.fn()}
        >
          {(formikProps) => (
            <ServicesForm
              profile={{ user_type: UserTypeEnum.SUPPLIER }}
              formikProps={formikProps}
              setCurrentForm={vi.fn()}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    await waitFor(() => {
      const dropdown = screen.getAllByText(/Category1/i)[0];
      expect(dropdown).toBeInTheDocument();
    });
  });

  it("triggers form submission on next button click", async () => {
    const mockFormikSubmit = vi.fn();
    const setCurrentFormMock = vi.fn();

    vi.mocked(useFetchServices).mockReturnValue({
      data: { payload: [] },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetched: true,
      isFetching: false,
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    vi.mocked(useDisclosure).mockReturnValue({
      isOpen: false,
      onOpen: vi.fn(),
      onClose: vi.fn(),
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{ categories: [], services: [] }}
          onSubmit={mockFormikSubmit}
          validate={() => ({})}
        >
          {(formikProps) => (
            <ServicesForm
              profile={{ user_type: UserTypeEnum.SUPPLIER }}
              formikProps={formikProps}
              setCurrentForm={setCurrentFormMock}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    const nextButton = screen.getByTestId("next-form");

    expect(nextButton).not.toBeDisabled();

    fireEvent.click(nextButton);

    await waitFor(() => {
      expect(mockFormikSubmit).toHaveBeenCalled();
      expect(setCurrentFormMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it("opens suggest service modal when button clicked", async () => {
    const mockOnOpen = vi.fn();

    vi.mocked(useFetchServices).mockReturnValue({
      data: { payload: [] },
      isLoading: false,
      isError: false,
      error: null,
      refetch: vi.fn(),
      isFetched: true,
      isFetching: false,
    } as any);

    vi.mocked(useDisclosure).mockReturnValue({
      isOpen: false,
      onOpen: mockOnOpen,
      onClose: vi.fn(),
    } as any);

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{ categories: [], services: [] }}
          onSubmit={vi.fn()}
        >
          {(formikProps) => (
            <ServicesForm
              profile={{ user_type: UserTypeEnum.SUPPLIER }}
              formikProps={formikProps}
              setCurrentForm={vi.fn()}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    const suggestButton = screen.getByTestId("suggest-service");

    expect(suggestButton).toBeInTheDocument();

    fireEvent.click(suggestButton);

    expect(mockOnOpen).toHaveBeenCalled();
  });
});
