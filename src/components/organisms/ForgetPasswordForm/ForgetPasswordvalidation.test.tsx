import { expect } from "vitest";
import { validationSchema } from "./ForgetPasswordvalidation";
import { t } from "i18next";

describe("validationSchema", () => {
  it("should validate correctly for a valid email", async () => {
    const validEmail = { emailOrPhone: "test@example.com" };

    await expect(validationSchema.validate(validEmail)).resolves.toEqual(
      validEmail
    );
  });

  it("should validate correctly for a valid phone number", async () => {
    const validPhone = { emailOrPhone: "+1234567890123" };

    await expect(validationSchema.validate(validPhone)).resolves.toEqual(
      validPhone
    );
  });

  it("should fail validation for an empty emailOrPhone", async () => {
    const emptyValue = { emailOrPhone: "" };

    await expect(validationSchema.validate(emptyValue)).rejects.toThrow(
      t("auth.forget_password.email_or_phone_required")
    );
  });

  it("should fail validation for an invalid email", async () => {
    const invalidEmail = { emailOrPhone: "invalid-email" };

    await expect(validationSchema.validate(invalidEmail)).rejects.toThrow(
      t("auth.forget_password.invalid_email_or_phone")
    );
  });

  it("should fail validation for an invalid phone number", async () => {
    const invalidPhone = { emailOrPhone: "12345" };

    await expect(validationSchema.validate(invalidPhone)).rejects.toThrow(
      t("auth.forget_password.invalid_email_or_phone")
    );
  });
});
