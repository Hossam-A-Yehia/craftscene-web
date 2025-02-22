import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import AuthPage from "./AuthPage";
import React from "react";

vi.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    height,
    width,
  }: {
    src: string;
    alt: string;
    height: number;
    width: number;
  }) => <img src={src} alt={alt} height={height} width={width} />,
}));

vi.mock("i18next", () => ({
  t: vi.fn((key: string) => key),
}));

const MockFormComponent: React.FC = () => <div>Mock Form</div>;

describe("AuthPage Component", () => {
  it("renders the logo image", () => {
    render(<AuthPage FormComponent={MockFormComponent} />);

    const logo = screen.getByAltText("Logo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/src/assets/images/logo.svg");
  });
  it("renders the auth title from i18next", () => {
    render(<AuthPage FormComponent={MockFormComponent} />);

    const title = screen.getByText("auth.title");
    expect(title).toBeInTheDocument();
  });

  it("renders the FormComponent", () => {
    render(<AuthPage FormComponent={MockFormComponent} />);

    const formComponent = screen.getByText("Mock Form");
    expect(formComponent).toBeInTheDocument();
  });
});
