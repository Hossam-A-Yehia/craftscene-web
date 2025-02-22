import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import React from "react";
import Head from "./Head";

describe("Head Component", () => {
  it("renders the title correctly", () => {
    render(
      <Head
        title="Main Title"
        desc="This is a description"
        categoryTitle="Category Name"
      />
    );

    const titleElement = screen.getByText("Main Title");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("text-3xl font-bold text-center");
  });

  it("renders the category title when provided", () => {
    render(
      <Head
        title="Main Title"
        desc="This is a description"
        categoryTitle="Category Name"
      />
    );

    const categoryElement = screen.getByText("(Category Name)");
    expect(categoryElement).toBeInTheDocument();
    expect(categoryElement).toHaveClass("text-xl font-bold text-center");
  });

  it("does not render the category title when not provided", () => {
    render(
      <Head title="Main Title" desc="This is a description" categoryTitle="" />
    );

    const categoryElement = screen.queryByText("(Category Name)");
    expect(categoryElement).not.toBeInTheDocument();
  });

  it("renders the description correctly", () => {
    render(
      <Head
        title="Main Title"
        desc="This is a description"
        categoryTitle="Category Name"
      />
    );

    const descElement = screen.getByText("This is a description");
    expect(descElement).toBeInTheDocument();
    expect(descElement).toHaveClass("text-center mb-8");
  });
});
