import { render } from "@testing-library/react";
import NavLink from "./NavLink";
import { expect } from "vitest";
import React from "react";

describe("NavLink Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(<NavLink href="/about">Go to About</NavLink>);
    expect(getByText("Go to About")).toBeInTheDocument();
  });

  it("renders the correct href attribute", () => {
    const { container } = render(<NavLink href="/about">Go to About</NavLink>);
    const linkElement = container.querySelector("a");
    expect(linkElement).toHaveAttribute("href", "/about");
  });
});
