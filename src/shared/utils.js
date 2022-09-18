/**
 * Shared Utility Functions
 * @version 0.1
 * @author Daniel Moret
 */

/**
 * Checks if a value **is** null or undefined.
 * @param value The value to evaluate.
 * @returns Whether the value **is** null or undefined.
 */
export function isNullOrUndefined(value) {
  return typeof value === "undefined" || value === null;
}
