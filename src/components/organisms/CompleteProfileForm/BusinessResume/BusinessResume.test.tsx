import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Formik } from "formik";
import BusinessResumeForm from "./BusinessResumeForm";

describe("BusinessResumeForm", () => {
  const renderComponent = (formikInitialValues, setCurrentFormMock) => {
    render(
      <Formik
        initialValues={formikInitialValues}
        onSubmit={vi.fn()}
        validate={() => ({})}
      >
        {(formikProps) => (
          <BusinessResumeForm
            formikProps={formikProps}
            setCurrentForm={setCurrentFormMock}
            profile={undefined}
          />
        )}
      </Formik>
    );
  };

  it("renders all required fields", () => {
    const formikInitialValues = {
      business_desc: "",
      files: [],
    };
    renderComponent(formikInitialValues, vi.fn());

    expect(screen.getByTestId("business_desc_en")).toBeDefined();
    expect(screen.getByTestId("business_desc_ar")).toBeDefined();
    expect(screen.getByTestId("upload-docs-title")).toBeDefined();
  });

  it("checks uploaded files", async () => {
    const formikInitialValues = {
      business_desc: "",
      files: [
        {
          file: new File(["content"], "uploaded.txt", { type: "text/plain" }),
          type: null,
        },
      ],
    };

    renderComponent(formikInitialValues, vi.fn());

    await waitFor(() => {
      expect(screen.getByText(/uploaded.txt/i)).toBeDefined();
    });

    const fileSize = (
      new File(["content"], "uploaded.txt").size /
      1024 /
      1024
    ).toFixed(2);
    expect(screen.getByText(`${fileSize} MB`)).toBeDefined();
    expect(screen.getByText(/Select file type/i)).toBeDefined();
  });
});
