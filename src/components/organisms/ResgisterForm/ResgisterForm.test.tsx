import { render, fireEvent, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import ResgisterForm from "./ResgisterForm";
import { useRegister } from "../../../hooks/useAuth";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));
vi.mock("@/hooks/useAuth", () => ({
  useRegister: vi.fn(),
}));

describe("ResgisterForm Component", () => {
  const mockMutate = vi.fn();

  const queryClient = new QueryClient();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRegister as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  it("renders the registration form with fields and buttons", () => {
    render(
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Wrap with QueryClientProvider */}
        <ResgisterForm />
      </QueryClientProvider>
    );

    expect(
      screen.getByLabelText("auth.register.first_name")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("auth.register.last_name")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("auth.register.email")).toBeInTheDocument();
    expect(screen.getByLabelText("auth.register.phone")).toBeInTheDocument();
    expect(screen.getByLabelText("auth.register.password")).toBeInTheDocument();
    expect(
      screen.getByLabelText("auth.register.confirm_password")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "auth.register.title" })
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Wrap with QueryClientProvider */}
        <ResgisterForm />
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText("auth.register.first_name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("auth.register.last_name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("auth.register.email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("auth.register.phone"), {
      target: { value: "+1234567890" },
    });
    fireEvent.change(screen.getByLabelText("auth.register.password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("auth.register.confirm_password"), {
      target: { value: "password123" },
    });

    fireEvent.click(
      screen.getByRole("button", { name: "auth.register.title" })
    );
  });

  it("displays error message when registration fails", async () => {
    (useRegister as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: new Error("Registration failed"),
    });

    render(
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Wrap with QueryClientProvider */}
        <ResgisterForm />
      </QueryClientProvider>
    );

    expect(await screen.findByText("Registration failed")).toBeInTheDocument();
  });

  it("shows password visibility toggle", () => {
    render(
      <QueryClientProvider client={queryClient}>
        {" "}
        {/* Wrap with QueryClientProvider */}
        <ResgisterForm />
      </QueryClientProvider>
    );
    const passwordInput = screen.getByLabelText("auth.register.password");
    const toggleButton = screen.getByTestId("eye-button");

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute("type", "password");
  });
});
