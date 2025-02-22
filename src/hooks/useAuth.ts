import { useMutation } from "@tanstack/react-query";
import {
  ForgetPasswordRequest,
  ForgetPasswordResponse,
  LoginRequest,
  LoginResponse,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ResgisterRequest,
  VerificationRequest,
  VerificationResponse,
} from "@/types/Auth";
import {
  changePhoneOrEmail,
  ForgetPassword,
  Login,
  loginWithGoogle,
  Register,
  resendCode,
  ResetPassword,
  VerificationEmail,
} from "@/services/authServices/authServices";

const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginRequest>({
    mutationFn: Login,
  });
};
const useRegister = () => {
  return useMutation<RegisterResponse, Error, ResgisterRequest>({
    mutationFn: Register,
  });
};
const useForgetPassword = () => {
  return useMutation<ForgetPasswordResponse, Error, ForgetPasswordRequest>({
    mutationFn: ForgetPassword,
  });
};
const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordRequest>({
    mutationFn: ResetPassword,
  });
};
const useVerificationEmail = () => {
  return useMutation<VerificationResponse, Error, VerificationRequest>({
    mutationFn: VerificationEmail,
  });
};
const useResendCode = () => {
  return useMutation({
    mutationFn: resendCode,
  });
};
const useChangePhoneOrEmail = () => {
  return useMutation({
    mutationFn: changePhoneOrEmail,
  });
};
const useLoginwithGoogle = () => {
  return useMutation({
    mutationFn: loginWithGoogle,
  });
};

export {
  useLogin,
  useRegister,
  useForgetPassword,
  useResetPassword,
  useVerificationEmail,
  useResendCode,
  useChangePhoneOrEmail,
  useLoginwithGoogle,
};
