export class HttpError extends Error {
  constructor(status, msg, data = undefined) {
    super(msg);
    this.status = status;
    this.data = data;
  }
}
