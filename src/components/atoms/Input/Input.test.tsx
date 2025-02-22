import { render, fireEvent } from "@testing-library/react";
import { expect, vi } from "vitest";
import "@testing-library/jest-dom";
import Input from "./Input";
import React from "react";

describe("Input Component", () => {
  it("renders with the correct placeholder", () => {
    const { getByPlaceholderText } = render(<Input placeholder="Enter text" />);
    expect(getByPlaceholderText("Enter text")).toBeInTheDocument();
  });

  it("applies the correct error class when there are errors and input is touched", () => {
    const { getByRole } = render(
      <Input
        id="input1"
        name="input1"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        touched={true}
        errors="This field is required"
      />
    );
    const input = getByRole("textbox");
    expect(input).toHaveClass("input-error");
  });

  it("applies the correct valid class when input is touched and has no errors", () => {
    const { getByRole } = render(
      <Input
        id="input1"
        name="input1"
        value="Some value"
        onChange={() => {}}
        placeholder="Enter text"
        touched={true}
        errors=""
      />
    );
    const input = getByRole("textbox");
    expect(input).toHaveClass("input-default");
  });

  it("applies the default class when the input is neither touched nor errored", () => {
    const { getByRole } = render(
      <Input
        id="input1"
        name="input1"
        value=""
        onChange={() => {}}
        placeholder="Enter text"
        touched={false}
        errors=""
      />
    );
    const input = getByRole("textbox");
    expect(input).toHaveClass("input-default");
  });

  it("calls onChange handler when value is typed", () => {
    const handleChange = vi.fn();
    const { getByRole } = render(
      <Input
        id="input1"
        name="input1"
        value=""
        onChange={handleChange}
        placeholder="Enter text"
        touched={false}
        errors=""
      />
    );
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "New text" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
