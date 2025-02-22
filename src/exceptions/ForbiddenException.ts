import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class ForbiddenException extends BaseException {
  constructor(message = "Access to this resource is forbidden") {
    super(message, EXCEPTIONS.FORBIDDEN);
  }
}
export { ForbiddenException };
