import { render, fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import LoginForm from "./LoginForm";
import { useLogin } from "../../../hooks/useAuth";
import { signIn } from "next-auth/react";
import React from "react";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
vi.mock("@/hooks/useAuth", () => ({
  useLogin: vi.fn(() => ({
    mutate: vi.fn(),
    isPending: false,
    error: null,
  })),
  useResendCode: vi.fn(() => ({
    mutateAsync: vi.fn(),
  })),
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn(),
}));

describe("LoginForm Component", () => {
  const mockMutate = vi.fn();

  it("renders the login form with fields and buttons", () => {
    render(<LoginForm />);

    expect(
      screen.getByLabelText("auth.login.email_or_phone")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("auth.login.password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "auth.login.login" })
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("auth.login.email_or_phone"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.login.login" }));
  });

  it("displays error message when login fails", async () => {
    (useLogin as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: new Error("Login failed"),
    });

    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("auth.login.email_or_phone"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.login.password"), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: "auth.login.login" }));

    expect(await screen.findByText("Login failed")).toBeInTheDocument();
  });

  it("shows password visibility toggle", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText("auth.login.password");
    const toggleButton = screen.getByTestId("eye-button");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("triggers Google login", () => {
    render(<LoginForm />);

    const googleButton = screen.getByRole("button", {
      name: "auth.login.google_login",
    });

    fireEvent.click(googleButton);

    expect(signIn).toHaveBeenCalledWith("google");
  });

  it("triggers Twitter login", () => {
    render(<LoginForm />);

    const twitterButton = screen.getByRole("button", {
      name: "auth.login.twitter_login",
    });

    fireEvent.click(twitterButton);

    expect(signIn).toHaveBeenCalledWith("twitter");
  });
});
