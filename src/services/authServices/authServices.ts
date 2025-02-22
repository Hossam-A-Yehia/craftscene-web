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
import apiClient from "../../config/apiClient";
import authEndpoints from "@/config/endpoints/authEndpoints";

export const Login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>(
    authEndpoints.login,
    data
  );
  return response.data;
};

export const Register = async (
  data: ResgisterRequest
): Promise<RegisterResponse> => {
  const response = await apiClient.post<RegisterResponse>(
    authEndpoints.register,
    data
  );
  return response.data;
};
export const ForgetPassword = async (
  data: ForgetPasswordRequest
): Promise<ForgetPasswordResponse> => {
  const response = await apiClient.post<ForgetPasswordResponse>(
    authEndpoints.forgetPassword,
    data
  );
  return response.data;
};
export const ResetPassword = async (
  data: ResetPasswordRequest
): Promise<ResetPasswordResponse> => {
  const response = await apiClient.post<ResetPasswordResponse>(
    authEndpoints.resetPassword,
    data
  );
  return response.data;
};
export const VerificationEmail = async (
  data: VerificationRequest
): Promise<VerificationResponse> => {
  const response = await apiClient.post<VerificationResponse>(
    authEndpoints.verify,
    data
  );
  return response.data;
};

export const resendCode = async (data: { email?: string; phone?: string }) => {
  const response = await apiClient.post(authEndpoints.resendCode, data);
  return response.data;
};
export const changePhoneOrEmail = async (data: {
  old_email?: string;
  new_email?: string;
  old_phone?: string;
  new_phone?: string;
}) => {
  const response = await apiClient.post(authEndpoints.changePhoneOrEmail, data);
  return response.data;
};

export const loginWithGoogle = async (email: string) => {
  const response = await apiClient.post(authEndpoints.loginWithGoogle, {
    email,
  });
  return response.data;
};
