import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class UnauthorizedException extends BaseException {
  constructor(message = "Unauthorized access") {
    super(message, EXCEPTIONS.UNAUTHORIZED);
  }
}

export { UnauthorizedException };
