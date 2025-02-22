import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class InternalServerErrorException extends BaseException {
  constructor(message = "An internal server error occurred") {
    super(message, EXCEPTIONS.INTERNAL_SERVER_ERROR);
  }
}
export { InternalServerErrorException };
