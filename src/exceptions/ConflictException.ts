import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class ConflictException extends BaseException {
  constructor(message = "Please verify your account") {
    super(message, EXCEPTIONS.CONFLICT);
  }
}

export { ConflictException };
