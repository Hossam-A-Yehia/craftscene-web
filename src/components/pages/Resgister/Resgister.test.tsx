import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import ResgisterPage from "./Resgister";
import React from "react";

vi.mock("@/components/templates/AuthPage/AuthPage", () => ({
  __esModule: true,
  default: ({ FormComponent }: { FormComponent: React.ComponentType }) => (
    <div data-testid="auth-page">
      <div data-testid="form-component">
        <FormComponent />
      </div>
    </div>
  ),
}));

vi.mock("@/components/organisms/ResgisterForm/ResgisterForm", () => ({
  __esModule: true,
  default: () => <div>Mocked ResgisterForm</div>,
}));

describe("ResgisterPage Component", () => {
  it("renders AuthPage with ResgisterForm", () => {
    render(<ResgisterPage />);
    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
    expect(screen.getByTestId("form-component")).toBeInTheDocument();
    expect(screen.getByText("Mocked ResgisterForm")).toBeInTheDocument();
  });
});
