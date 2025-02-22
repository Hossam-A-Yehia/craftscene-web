import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import "@testing-library/jest-dom";
import ClientOnlyWrapper from "./ClientOnlyWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { I18nextProvider } from "react-i18next";
import React from "react";
import i18n from "../../il8n/index";

const queryClient = new QueryClient();

describe("ClientOnlyWrapper Component", () => {
  it("renders children correctly", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ClientOnlyWrapper>
            <div>Test Child</div>
          </ClientOnlyWrapper>
        </QueryClientProvider>
      </I18nextProvider>
    );

    const childElement = screen.getByText("Test Child");
    expect(childElement).toBeInTheDocument();
  });

  it("applies dir-rtl class when language is Arabic", () => {
    i18n.changeLanguage("ar");

    render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ClientOnlyWrapper>
            <div>Test Child</div>
          </ClientOnlyWrapper>
        </QueryClientProvider>
      </I18nextProvider>
    );

    const wrapper = screen.getByText("Test Child").parentElement;
    expect(wrapper).toHaveClass("dir-rtl");
  });

  it("applies dir-ltr class when language is not Arabic", () => {
    i18n.changeLanguage("en");

    render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ClientOnlyWrapper>
            <div>Test Child</div>
          </ClientOnlyWrapper>
        </QueryClientProvider>
      </I18nextProvider>
    );

    const wrapper = screen.getByText("Test Child").parentElement;
    expect(wrapper).toHaveClass("dir-ltr");
  });

  it("renders QueryClientProvider with the query client", () => {
    render(
      <I18nextProvider i18n={i18n}>
        <QueryClientProvider client={queryClient}>
          <ClientOnlyWrapper>
            <div>Test Child</div>
          </ClientOnlyWrapper>
        </QueryClientProvider>
      </I18nextProvider>
    );

    expect(screen.getByText("Test Child")).toBeInTheDocument();
  });
});
