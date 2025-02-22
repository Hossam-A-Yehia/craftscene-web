import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import LoginPage from "./Login";
import React from "react";

vi.mock("react-i18next", () => ({
  useTranslation: vi.fn(() => ({
    t: vi.fn((key: string) => key),
  })),
}));

vi.mock("@/components/templates/AuthPage/AuthPage", () => ({
  __esModule: true,
  default: ({
    title,
    FormComponent,
  }: {
    title: string;
    FormComponent: React.ComponentType;
  }) => (
    <div>
      <h1>{title}</h1>
      <div data-testid="mocked-form-component">
        <FormComponent />
      </div>
    </div>
  ),
}));

vi.mock("@/components/organisms/LoginForm/LoginForm", () => ({
  __esModule: true,
  default: () => <div>Mocked LoginForm</div>,
}));

describe("LoginPage Component", () => {
  it("renders AuthPage with the correct title and LoginForm", () => {
    render(<LoginPage />);
    expect(screen.getByText("logo")).toBeInTheDocument();
    expect(screen.getByText("Mocked LoginForm")).toBeInTheDocument();
    expect(screen.getByTestId("mocked-form-component")).toBeInTheDocument();
  });
});
