/**
 * Checks if a value **is** null or undefined.
 * @param value  The value to evaluate
 * @returns Whether the value **is** null or undefined.
 */
export function isNullOrUndefined(value) {
  return typeof value === "undefined" || value === null;
}

/**
 * Checks whether a specified string is null or an empty string.
 * @param  value  The string to test.
 * @returns `true` if the value **is** null or an empty string, otherwise `false`.
 */
export function isStringNullOrEmpty(value) {
  if (isNullOrUndefined(value) || typeof value !== "string") {
    return true;
  }
  return value.length === 0;
}
