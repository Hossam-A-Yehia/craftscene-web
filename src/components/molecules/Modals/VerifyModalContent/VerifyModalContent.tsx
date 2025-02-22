import Avatar from "@/components/atoms/Avatar/Avatar";
import Button from "@/components/atoms/Button/Button";
import Text from "@/components/atoms/Text/Text";
import { IoClose } from "react-icons/io5";
import { t } from "i18next";
import React, { useState } from "react";
import Input from "@/components/atoms/Input/Input";
import { toast } from "react-toastify";
import { useChangePhoneOrEmail } from "@/hooks/useAuth";

type ModalContentProps = {
  onConfirm: () => void;
  onCancel: () => void;
  target: string;
  onUpdate: (newValue: string) => void;
  isResendPending: boolean;
};

const isPhoneNumber = (target: string): boolean => {
  return /^[+\d]{1,4}\d{10,14}$/.test(Number(target) as any);
};

const VerifyModalContent = ({
  onConfirm,
  onCancel,
  target,
  onUpdate,
  isResendPending,
}: ModalContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newValue, setNewValue] = useState("");
  const { mutateAsync, isPending } = useChangePhoneOrEmail();

  const targetKey = isPhoneNumber(target) ? "phone" : "email";

  const handleSave = () => {
    if (!newValue.trim() || newValue === target) {
      toast.warn(t(`auth.varify.please_enter_a_new`) + targetKey);
      return;
    }

    const userData = JSON.parse(localStorage.getItem("userData-craft") ?? "{}");
    const updatedUserData = { ...userData, [targetKey]: newValue };
    const structuredData = {
      [`old_${targetKey}`]: target,
      [`new_${targetKey}`]: newValue,
    };
    mutateAsync(structuredData)
      .then(() => {
        toast.success(t(`${targetKey} changed successfully`));
        localStorage.setItem("userData-craft", JSON.stringify(updatedUserData));
        onUpdate?.(newValue);
        setIsEditing(false);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <div
      data-testid="verify-modal"
      className="relative py-8 px-[50px] space-y-6 bg-white rounded-lg text-center shadow-lg max-w-lg mx-auto transition-all transform scale-100 hover:scale-105"
    >
      <button
        onClick={onCancel}
        className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        aria-label="Close"
        data-testid="close-button"
      >
        <IoClose size={24} />
      </button>
      <div className="flex items-center justify-center gap-3">
        <Avatar src="/logo.png" alt="Logo" />
        <Text className="font-semibold text-xl">CraftScene</Text>
      </div>
      <Text className="text-xl text-main font-semibold ml-4 pt-3">
        {isEditing
          ? t(`Change your ${targetKey}`)
          : t("auth.varify.verify_your_account")}
      </Text>
      {isEditing ? (
        <div className="space-y-4">
          <Input
            type={targetKey === "phone" ? "tel" : "email"}
            placeholder={t(`Enter new ${targetKey}`)}
            value={newValue ? newValue : target}
            onChange={(e) => setNewValue(e.target.value)}
            id={`${targetKey}-input`}
            name={"key"}
          />
          <div className="flex justify-center gap-3 pt-3">
            <Button
              dataTestid="save-button"
              variant="main"
              onClick={handleSave}
              disabled={isPending}
            >
              {t("auth.varify.save")}
            </Button>
            <Button
              dataTestid="cancel-button"
              variant="outlineMain"
              onClick={() => setIsEditing(false)}
            >
              {t("auth.varify.cancel")}
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <Text className="text-slate-400">
            {t(`auth.varify.desc`) + targetKey}
          </Text>
          <Text className="mt-1" testId="target-value">
            {target}
          </Text>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              variant="main"
              onClick={onConfirm}
              disabled={isResendPending}
              dataTestid="resend-button"
            >
              {t("auth.varify.resend_verification_code_again")}
            </Button>
            <Button
              dataTestid="change-button"
              variant="outlineMain"
              onClick={() => setIsEditing(true)}
            >
              {t(`auth.varify.change`) + targetKey}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyModalContent;
