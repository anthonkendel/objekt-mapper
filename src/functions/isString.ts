/**
 * Check if a value is a string.
 *
 * @param value the value to check.
 */
export function isString(value: unknown | null | undefined): value is string {
  return typeof value === "string" || value instanceof String;
}
