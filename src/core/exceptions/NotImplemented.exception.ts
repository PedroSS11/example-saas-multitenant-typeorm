export class NotImplementedException extends Error {
  constructor(message?: string) {
    super(message || 'Method not implemented.');
    this.name = 'NotImplementedException';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedException);
    }
  }
}
