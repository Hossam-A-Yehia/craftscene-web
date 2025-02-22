import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import UpdateUserServices from "./UpdateUserServices";
import React from "react";
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({
    invalidateQueries: vi.fn(),
  }),
}));

vi.mock("react-toastify", () => ({
  toast: {
    info: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("@/hooks/useServices", () => ({
  useMutateDeleteUserService: () => ({
    mutateAsync: vi.fn().mockResolvedValue({}),
    isPending: false,
  }),
}));

vi.mock("@/hooks/useUser", () => ({
  useFetchUser: () => ({
    data: {
      id: 1,
      user_type: 1,
    },
  }),
  useFetchUserServices: () => ({
    data: {
      payload: {
        data: [
          {
            id: 1,
            service: {
              name_en: "Service 1",
              name_ar: "خدمة 1",
            },
            service_id: 1,
          },
          {
            id: 2,
            service: {
              name_en: "Service 2",
              name_ar: "خدمة 2",
            },
            service_id: 2,
          },
        ],
      },
    },
  }),
}));

vi.mock(
  "@/components/molecules/UserServices/UserServicesForm/UserServicesForm",
  () => ({
    default: ({ userId, userType }: any) => (
      <div data-testid="user-services-form">
        <span data-testid="user-id">{userId}</span>
        <span data-testid="user-type">{userType}</span>
      </div>
    ),
  })
);

vi.mock(
  "@/components/molecules/UserServices/UserServiceTable/UserServiceTable",
  () => ({
    default: ({ userServices, onDelete, isMutateDeleteLoading }: any) => (
      <div data-testid="user-service-table">
        {userServices.map((service: any) => (
          <button
            key={service.id}
            data-testid={`delete-button-${service.id}`}
            onClick={() => onDelete(service.id)}
            disabled={isMutateDeleteLoading}
          >
            Delete {service.service.name_en}
          </button>
        ))}
      </div>
    ),
  })
);

describe("UpdateUserServices", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders both UserServicesForm and UserServiceTable components", () => {
    render(<UpdateUserServices />);

    expect(screen.getByTestId("user-services-form")).toBeInTheDocument();
    expect(screen.getByTestId("user-service-table")).toBeInTheDocument();
  });

  it("passes correct props to UserServicesForm", () => {
    render(<UpdateUserServices />);

    expect(screen.getByTestId("user-id")).toHaveTextContent("1");
    expect(screen.getByTestId("user-type")).toHaveTextContent("1");
  });
});
