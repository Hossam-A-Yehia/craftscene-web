import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ForgetPasswordPage from "./ForgetPassword";
import React from "react";

vi.mock("@/components/templates/AuthPage/AuthPage", () => ({
  __esModule: true,
  default: ({ FormComponent }: { FormComponent: React.ComponentType }) => (
    <div>
      Mocked AuthPage
      <div data-testid="mocked-form-component">
        <FormComponent />
      </div>
    </div>
  ),
}));

vi.mock("@/components/organisms/ForgetPasswordForm/ForgetPasswordForm", () => ({
  __esModule: true,
  default: () => <div>Mocked ForgetPasswordForm</div>,
}));

describe("ForgetPasswordPage Component", () => {
  it("renders the AuthPage component with the ForgetPasswordForm", () => {
    render(<ForgetPasswordPage />);
    expect(screen.getByText("Mocked AuthPage")).toBeInTheDocument();
    expect(screen.getByText("Mocked ForgetPasswordForm")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-form-component")).toBeInTheDocument();
  });
});
