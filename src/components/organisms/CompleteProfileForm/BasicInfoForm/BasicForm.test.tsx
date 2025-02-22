import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import BasicInfoForm from "./BasicInfoForm";
import { Formik } from "formik";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initialValues } from "../initialValues";
import { BasicInfoValidationSchema } from "./BasicInfovalidation";

const queryClient = new QueryClient();

vi.mock("@/hooks/useCountry", () => ({
  useCountry: () => ({
    data: {
      data: {
        payload: [
          {
            id: "1",
            name_en: "USA",
            cities: [{ id: "1", name_en: "New York" }],
          },
          {
            id: "2",
            name_en: "Canada",
            cities: [{ id: "2", name_en: "Toronto" }],
          },
        ],
      },
    },
    isLoading: false,
  }),
}));

vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("BasicForm Component", () => {
  const mockProps = {
    setCurrentForm: vi.fn(),
    profile: {},
  };

  it("renders the BasicForm component correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Formik initialValues={initialValues} onSubmit={() => {}}>
          {(formikProps) => (
            <BasicInfoForm {...mockProps} formikProps={formikProps} />
          )}
        </Formik>
      </QueryClientProvider>
    );

    screen.debug();
    expect(screen.getByTestId("profile")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toBeInTheDocument();
    expect(screen.getByTestId("business_name")).toBeInTheDocument();
    expect(screen.getByTestId("business_email")).toBeInTheDocument();
    expect(screen.getByTestId("phone")).toBeInTheDocument();
    expect(screen.getByTestId("hotline")).toBeInTheDocument();
    expect(screen.getByTestId("country_id")).toBeInTheDocument();
    expect(screen.getByTestId("city_id")).toBeInTheDocument();
    expect(screen.getByTestId("location")).toBeInTheDocument();
    expect(screen.getByTestId("categories")).toBeInTheDocument();
  });

  it("Fill the form", async () => {
    const mockSubmit = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={initialValues}
          onSubmit={() => {}}
          validationSchema={BasicInfoValidationSchema}
        >
          {(formikProps) => {
            return (
              <BasicInfoForm
                {...mockProps}
                formikProps={formikProps}
                setCurrentForm={mockSubmit}
              />
            );
          }}
        </Formik>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByTestId("business_name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("business_email"), {
      target: { value: "John@example.com" },
    });
    fireEvent.change(screen.getByTestId("phone"), {
      target: { value: "01007997975" },
    });
    fireEvent.change(screen.getByTestId("hotline"), {
      target: { value: "123" },
    });

    const countrySelect = screen.getByTestId("country_id");
    fireEvent.mouseDown(countrySelect.querySelector(".react-select__control")!);
    await waitFor(() => {
      expect(screen.getByText("USA")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("USA"));
    await waitFor(() => {
      expect(screen.getByText("USA")).toBeInTheDocument();
    });

    const citySelect = screen.getByTestId("city_id");
    fireEvent.mouseDown(citySelect.querySelector(".react-select__control")!);
    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText("New York"));
    await waitFor(() => {
      expect(screen.getByText("New York")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId("location"));
    await waitFor(() => {
      expect(screen.getByTestId("map-modal-title")).toBeInTheDocument();
    });
  });
  it("submit the form", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={{
            business_name: "John",
            business_email: "John@example.com",
            phone: "01007997975",
            hotline: "123",
            country_id: 21,
            city_id: 28,
            lat: 24.7136,
            lang: 46.6753,
            categories: [{ value: 1, label: "Category 1" }],
            profile: null,
            logo: null,
          }}
          onSubmit={() => {}}
          validationSchema={BasicInfoValidationSchema}
        >
          {(formikProps) => {
            return (
              <BasicInfoForm
                {...mockProps}
                formikProps={formikProps}
                setCurrentForm={() => {}}
              />
            );
          }}
        </Formik>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByTestId("next-step"));
  });
});
