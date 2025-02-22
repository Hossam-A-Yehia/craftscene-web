import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Formik } from "formik";
import BusinessHistoryForm from "./BusinessHistoryForm";
import {
  SUPPLIER,
  SERVICE_PROVIDER_CONTRACTOR,
} from "../../../../constants/constants";

describe("BusinessHistoryForm", () => {
  const queryClient = new QueryClient();

  vi.mock("@/hooks/useOptions", () => ({
    useOptions: vi.fn().mockReturnValue([]),
  }));

  const renderComponent = (profile, formikInitialValues) => {
    const setCurrentFormMock = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Formik
          initialValues={formikInitialValues}
          onSubmit={() => {
            setCurrentFormMock((prev) => prev + 1);
          }}
          validate={() => ({})}
        >
          {(formikProps) => (
            <BusinessHistoryForm
              profile={profile}
              formikProps={formikProps}
              setCurrentForm={setCurrentFormMock}
            />
          )}
        </Formik>
      </QueryClientProvider>
    );

    return { setCurrentFormMock };
  };

  it("renders form fields for suppliers", () => {
    const profile = { user_type: SUPPLIER };
    const formikInitialValues = {
      classifications: [],
      price_range: "",
      volume_of_work: "",
      number_of_employees: "",
      years_of_experience: "",
    };

    renderComponent(profile, formikInitialValues);

    expect(screen.getByTestId("classifications")).toBeDefined();

    expect(screen.getByTestId("volume_of_work")).toBeDefined();

    expect(screen.getByTestId("number_of_employees")).toBeDefined();

    expect(screen.getByTestId("years_of_experience")).toBeDefined();
  });

  it("renders form fields for contractors", () => {
    const profile = { user_type: SERVICE_PROVIDER_CONTRACTOR };
    const formikInitialValues = {
      classifications: [],
      price_range: "",
      volume_of_work: "",
      number_of_employees: "",
      years_of_experience: "",
      accomplished_projects_count: "",
    };

    renderComponent(profile, formikInitialValues);

    expect(screen.getByTestId("classifications")).toBeDefined();

    expect(screen.getByTestId("accomplished_projects_count")).toBeDefined();
  });
});
