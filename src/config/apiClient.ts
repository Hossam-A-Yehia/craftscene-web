import { EXCEPTIONS } from "@/constants/constants";
import { BadRequestException } from "@/exceptions/BadRequestException";
import { ConflictException } from "@/exceptions/ConflictException";
import { ForbiddenException } from "@/exceptions/ForbiddenException";
import { InternalServerErrorException } from "@/exceptions/InternalServerErrorException";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { PreconditionRequiredException } from "@/exceptions/PreconditionRequiredException";
import { UnauthorizedException } from "@/exceptions/UnauthorizedException";
import { UnprocessableExeption } from "@/exceptions/UnprocessableExeption";
import axios from "axios";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Client-Type": "mobile",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      const exceptionMap = {
        [EXCEPTIONS.NOT_FOUND]: NotFoundException,
        [EXCEPTIONS.UNAUTHORIZED]: UnauthorizedException,
        [EXCEPTIONS.FORBIDDEN]: ForbiddenException,
        [EXCEPTIONS.INTERNAL_SERVER_ERROR]: InternalServerErrorException,
        [EXCEPTIONS.BAD_REQUEST]: BadRequestException,
        [EXCEPTIONS.PRECONDITION_REQUIRED]: PreconditionRequiredException,
        [EXCEPTIONS.CONFLICT]: ConflictException,
        [EXCEPTIONS.UNPROCESSABLE]: UnprocessableExeption,
      };
      const ExceptionClass = exceptionMap[status];
      if (status === EXCEPTIONS.PRECONDITION_REQUIRED) {
        throw new ExceptionClass(
          data?.message || "An error occurred",
          data.token
        );
      }
      if (status === EXCEPTIONS.UNPROCESSABLE) {
        throw new ExceptionClass("The inserted code is invalid");
      }
      if (ExceptionClass) {
        throw new ExceptionClass(data?.message || "An error occurred", status);
      }
    }
    throw new Error("An unexpected error occurred");
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const lang =
      typeof window !== "undefined"
        ? localStorage.getItem("appLanguage") || "en"
        : "en";
    const token = Cookies.get("authToken") || Cookies.get("signUpToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers["Accept-Language"] = lang;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default apiClient;
