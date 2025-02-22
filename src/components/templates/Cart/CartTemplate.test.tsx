import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Cart from "./CartTemplate";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

const queryClient = new QueryClient();

describe("Cart Component", () => {
  const userId = "123";

  it("renders correctly title", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Cart userId={userId} />
      </QueryClientProvider>
    );
    const title = screen.getByTestId("title");
    expect(title).toBeDefined();
  });
});
