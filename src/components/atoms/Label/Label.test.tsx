import { render } from "@testing-library/react";
import { expect } from "vitest";
import Label from "./Label";
import React from "react";

describe("Label Component", () => {
  it("renders with the correct htmlFor prop", () => {
    const { getByLabelText } = render(
      <>
        <Label htmlFor="input1">Label Text</Label>
        <input id="input1" />
      </>
    );
    const label = getByLabelText("Label Text");
    expect(label).toBeInTheDocument();
  });

  it("renders the children prop correctly", () => {
    const { getByText } = render(<Label htmlFor="input1">Label Text</Label>);
    expect(getByText("Label Text")).toBeInTheDocument();
  });

  it("has the correct class names", () => {
    const { container } = render(<Label htmlFor="input1">Label Text</Label>);
    const label = container.querySelector("label");
    expect(label).toHaveClass("text-sm", "font-semibold", "mb-2");
  });
});
