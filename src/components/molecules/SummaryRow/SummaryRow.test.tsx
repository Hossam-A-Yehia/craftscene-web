import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SummaryRow from "./SummaryRow";
import React from "react";

describe("SummaryRow Component", () => {
  it("renders with required props", () => {
    render(<SummaryRow label="Total" value="$100" testId="total-row" />);

    const row = screen.getByTestId("total-row");
    expect(row).toHaveClass("flex", "items-center", "justify-between");

    const label = screen.getByTestId("total-row-label");
    expect(label).toHaveClass("text-sm", "text-gray-600");
    expect(label).toHaveTextContent("Total");

    const value = screen.getByTestId("total-row-value");
    expect(value).toHaveClass("text-sm", "font-medium", "text-gray-900");
    expect(value).toHaveTextContent("$100");
  });

  it("applies custom value class", () => {
    render(
      <SummaryRow
        label="Discount"
        value="-$20"
        valueClass="text-red-500"
        testId="discount-row"
      />
    );

    const value = screen.getByTestId("discount-row-value");
    expect(value).toHaveClass("text-sm", "font-medium", "text-red-500");
    expect(value).not.toHaveClass("text-gray-900");
  });

  it("renders with custom test id", () => {
    const testId = "summary-row-test";
    render(<SummaryRow label="Subtotal" value="$80" testId={testId} />);

    const row = screen.getByTestId(testId);
    expect(row).toBeDefined();

    const label = screen.getByTestId(`${testId}-label`);
    expect(label).toBeDefined();

    const value = screen.getByTestId(`${testId}-value`);
    expect(value).toBeDefined();
  });

  it("maintains layout with long text content", () => {
    const longLabel =
      "This is a very long label that should still maintain layout";
    const longValue =
      "This is a very long value that should still maintain layout";

    render(
      <SummaryRow
        label={longLabel}
        value={longValue}
        testId="long-content-row"
      />
    );

    const row = screen.getByTestId("long-content-row");
    expect(row).toHaveClass("flex", "items-center", "justify-between");

    const labelElement = screen.getByTestId("long-content-row-label");
    expect(labelElement).toBeDefined();
    expect(labelElement).toHaveClass("text-sm", "text-gray-600");
    expect(labelElement).toHaveTextContent(longLabel);

    const valueElement = screen.getByTestId("long-content-row-value");
    expect(valueElement).toBeDefined();
    expect(valueElement).toHaveClass("text-sm", "font-medium", "text-gray-900");
    expect(valueElement).toHaveTextContent(longValue);
  });

  it("renders with empty strings", () => {
    render(<SummaryRow label="" value="" testId="empty-row" />);

    const row = screen.getByTestId("empty-row");
    expect(row).toBeDefined();

    const label = screen.getByTestId("empty-row-label");
    expect(label).toHaveTextContent("");

    const value = screen.getByTestId("empty-row-value");
    expect(value).toHaveTextContent("");
  });
});
