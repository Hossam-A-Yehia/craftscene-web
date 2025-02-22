import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class BadRequestException extends BaseException {
  constructor(message = "Bad request, invalid input") {
    super(message, EXCEPTIONS.BAD_REQUEST);
  }
}

export { BadRequestException };
