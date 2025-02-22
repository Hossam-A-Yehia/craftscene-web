import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class PreconditionRequiredException extends BaseException {
  constructor(message = "Bad request, invalid input", token?: string) {
    super(message, EXCEPTIONS.PRECONDITION_REQUIRED, token);
  }
}

export { PreconditionRequiredException };
