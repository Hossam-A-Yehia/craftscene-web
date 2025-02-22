import { EXCEPTIONS } from "@/constants/constants";
import BaseException from "./BaseException";

class UnprocessableExeption extends BaseException {
  constructor(message = "The inserted code is invalid") {
    super(message, EXCEPTIONS.UNPROCESSABLE);
  }
}
export { UnprocessableExeption };
