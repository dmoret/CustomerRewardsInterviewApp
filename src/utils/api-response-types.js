/**
 * API Response Types
 * @version 0.1
 * @author Daniel Moret
 */

export class UserError extends Error {
  responseJson = "";
  constructor(message, body) {
    super(message);
    this.responseJson = body;
    Object.setPrototypeOf(this, UserError.prototype);
  }
  getResponseJson() {
    return this.responseJson;
  }
}
