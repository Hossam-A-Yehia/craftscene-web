import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Formik } from "formik";
import PackagesForm from "./PackagesForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFetchPackages } from "../../../../hooks/usePackages";
import { useLanguage } from "../../../../hooks/useLanguage";
import { initialValues } from "../initialValues";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: vi.fn(),
}));

vi.mock("@/hooks/usePackages", () => ({
  useFetchPackages: vi.fn(),
}));

describe("PackagesForm", () => {
  const queryClient = new QueryClient();

  it("renders loader while fetching packages", () => {
    vi.mocked(useFetchPackages).mockReturnValue({
      isLoading: true,
      data: null,
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    render(
      <QueryClientProvider client={queryClient}>
        <Formik initialValues={initialValues} onSubmit={vi.fn()}>
          {(formikProps) => (
            <PackagesForm
              profile={{ id: 1 }}
              formikProps={formikProps}
              setCurrentForm={vi.fn()}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders package options when data is loaded", async () => {
    vi.mocked(useFetchPackages).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          payload: {
            data: [
              { id: 1, name_en: "Basic Package", price: 100 },
              { id: 2, name_en: "Premium Package", price: 200 },
            ],
          },
        },
      },
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    render(
      <QueryClientProvider client={queryClient}>
        <Formik initialValues={initialValues} onSubmit={vi.fn()}>
          {(formikProps) => (
            <PackagesForm
              profile={{ id: 1 }}
              formikProps={formikProps}
              setCurrentForm={vi.fn()}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Basic Package/i)).toBeInTheDocument();
      expect(screen.getByText(/Premium Package/i)).toBeInTheDocument();
    });
  });

  it("triggers form submission on submit button click", async () => {
    const mockFormikSubmit = vi.fn();
    const setCurrentFormMock = vi.fn();

    vi.mocked(useFetchPackages).mockReturnValue({
      isLoading: false,
      data: {
        data: {
          payload: {
            data: [{ id: 1, name_en: "Basic Package", price: 100 }],
          },
        },
      },
    } as any);

    vi.mocked(useLanguage).mockReturnValue("en");

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={initialValues}
          onSubmit={mockFormikSubmit}
          validate={() => ({})}
        >
          {(formikProps) => (
            <PackagesForm
              profile={{ id: 1 }}
              formikProps={formikProps}
              setCurrentForm={setCurrentFormMock}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    const submitButton = screen.getByRole("button", { name: /Submit/i });

    expect(submitButton).not.toBeDisabled();

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockFormikSubmit).toHaveBeenCalled();
    });
  });
});
