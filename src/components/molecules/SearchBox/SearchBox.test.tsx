import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
import SearchBox from "./SearchBox";
import React from "react";

describe("SearchBox Component", () => {
  const onSearch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders the title and description", () => {
    const mockProps = {
      name: "searchInput",
      title: "Search Ideas",
      desc: "Find interesting ideas",
      placeholder: "Search...",
      onSearch,
      categoryTitle: "Category Title",
    };

    render(<SearchBox {...mockProps} />);

    expect(screen.getByText("Search Ideas")).toBeInTheDocument();
    expect(screen.getByText("Find interesting ideas")).toBeInTheDocument();
  });

  it("renders the search input field with the correct placeholder", () => {
    const mockProps = {
      name: "searchInput",
      title: "Search Ideas",
      desc: "Find interesting ideas",
      placeholder: "Search for ideas...",
      onSearch,
      categoryTitle: "Category Title",
    };

    render(<SearchBox {...mockProps} />);

    const inputField = screen.getByPlaceholderText("Search for ideas...");
    expect(inputField).toBeInTheDocument();
  });

  it("updates the search query when the input value changes", () => {
    const mockProps = {
      name: "searchInput",
      title: "Search Ideas",
      desc: "Find interesting ideas",
      placeholder: "Search...",
      onSearch,
      categoryTitle: "Category Title",
    };

    render(<SearchBox {...mockProps} />);

    const inputField = screen.getByPlaceholderText("Search...");
    fireEvent.change(inputField, { target: { value: "new query" } });

    expect(inputField).toHaveValue("new query");
  });
});
