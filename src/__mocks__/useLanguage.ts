import { vi } from "vitest";

vi.mock("@/hooks/useLanguage", () => ({
  useLanguage: () => "en",
}));
