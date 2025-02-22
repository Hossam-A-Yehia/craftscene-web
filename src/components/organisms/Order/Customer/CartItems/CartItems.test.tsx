import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CartItems } from "./CartItems";
import React from "react";

vi.mock("i18next", () => ({
  t: (key: string) => key,
}));

vi.mock("@/components/atoms/Loader/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));

vi.mock("@/components/molecules/NoDate/NoDate", () => ({
  default: () => <div data-testid="no-data">No Data Available</div>,
}));

vi.mock("@/components/atoms/NavLink/NavLink", () => ({
  default: ({
    children,
    href,
    "data-testid": testId,
  }: {
    children: React.ReactNode;
    href: string;
    "data-testid": string;
  }) => (
    <a href={href} data-testid={testId}>
      {children}
    </a>
  ),
}));

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));

describe("CartItems Component", () => {
  const mockOrder: any = {
    supplier: {
      id: 1,
      business_user_detail: {
        business_name: "Test Supplier",
      },
    },
    products: [
      {
        id: 1,
        title_en: "Test Product",
        short_desc_en: "Test Description",
        price: 100,
        quantity: 2,
        product_status: 1,
        variant_images: [
          {
            url: "https://example.com/image.jpg",
            title: "Test Image",
          },
        ],
      },
    ],
  };

  it("shows loader when loading", () => {
    render(<CartItems order={mockOrder} isLoading={true} />);
    expect(screen.getByTestId("loader")).toBeDefined();
  });

  it("shows no data when products array is empty", () => {
    const emptyOrder = { ...mockOrder, products: [] };
    render(<CartItems order={emptyOrder} isLoading={false} />);
    expect(screen.getByTestId("no-data")).toBeDefined();
  });

  it("renders supplier information correctly", () => {
    render(<CartItems order={mockOrder} isLoading={false} />);

    expect(screen.getByTestId("supplier-name")).toBeDefined();
    expect(screen.getByTestId("supplier-name")).toHaveTextContent(
      "Test Supplier"
    );
    expect(screen.getByTestId("products-length")).toBeDefined();
  });

  it("toggles product details visibility when clicking header", () => {
    render(<CartItems order={mockOrder} isLoading={false} />);

    const header = screen.getByTestId("product-header");
    const chevron = screen.getByTestId("chevron-icon");

    expect(chevron.firstChild).toHaveClass("rotate-180");

    fireEvent.click(header);
    expect(chevron.firstChild).not.toHaveClass("rotate-180");
    expect(screen.queryByTestId("product-details")).toBeNull();
  });

  it("displays product details correctly", () => {
    render(<CartItems order={mockOrder} isLoading={false} />);

    expect(screen.getByTestId("product-title")).toBeDefined();
    expect(screen.getByTestId("product-description")).toBeDefined();
    expect(screen.getByTestId("product-price")).toBeDefined();
    expect(screen.getByTestId("product-quantity")).toBeDefined();
    expect(screen.getByTestId("product-status")).toBeDefined();
  });
  it("renders product image when available", () => {
    render(<CartItems order={mockOrder} isLoading={false} />);

    const image = screen.getByTestId("product-image");
    expect(image).toHaveAttribute("src", "https://example.com/image.jpg");
    expect(image).toHaveAttribute("alt", "Test Image");
  });

  it("renders view profile link correctly", () => {
    render(<CartItems order={mockOrder} isLoading={false} />);

    const profileLink = screen.getByTestId("profile-link");
    expect(profileLink).toHaveAttribute("href", "/business-user/1");
    expect(profileLink).toBeDefined();
  });

  it("handles missing product images gracefully", () => {
    const orderWithoutImages = {
      ...mockOrder,
      products: [
        {
          ...mockOrder.products[0],
          variant_images: [],
        },
      ],
    };
    render(<CartItems order={orderWithoutImages} isLoading={false} />);
    expect(screen.queryByTestId("product-image")).toBeNull();
  });
});
