class BaseException extends Error {
  status: number;
  token?: string;

  constructor(message: string | undefined, status: number, token?: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.token = token; //
    Error.captureStackTrace(this, this.constructor);
  }
}

export default BaseException;
