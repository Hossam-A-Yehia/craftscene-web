import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class NotFoundException extends BaseException {
  constructor(message = "Resource not found") {
    super(message, EXCEPTIONS.NOT_FOUND);
  }
}

export { NotFoundException };
