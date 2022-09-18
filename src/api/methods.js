/**
 * API Methods
 * @version 0.1
 * @author Daniel Moret
 */

import { UserError } from "./response-types";

// Handle API response
export const handleResponse = (response) => {
  if (!response.ok) {
    if (response.status === 400) {
      return response.json().then((data) => {
        throw new UserError(response.statusText, data);
      });
    } else if (response.status === 403) {
      throw new Error("Forbidden");
    } else if (response.status === 404) {
      throw new Error("Not Found");
    }
  }
  return Promise.resolve(response.json());
};
