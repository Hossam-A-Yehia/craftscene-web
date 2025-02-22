import { render, screen } from "@testing-library/react";
import EditUserTemplate from "./EditUserTemplate";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "../../../context/UserContext";
import { expect, vi } from "vitest";
import React from "react";

vi.mock("i18next", () => ({
  t: (key) => key,
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: vi.fn(),
    push: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const queryClient = new QueryClient();

describe("EditUserTemplate", () => {
  it("renders the template and includes the EditUserForm", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <EditUserTemplate userId="1" />
        </UserProvider>
      </QueryClientProvider>
    );

    expect(screen.getByText("edit_user.title")).toBeDefined();
    expect(screen.getByTestId("edit-user-form")).toBeDefined();
  });
});
