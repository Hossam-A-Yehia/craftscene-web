import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import Similar from "./Similar";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

describe("Similar Component", () => {
  it("renders the NoDataSection when there is no data", () => {
    render(<Similar data={[]} isLoading={false} title="Similar Ideas" />);
    expect(screen.getByText(/No data available/i)).toBeInTheDocument();
  });
});
