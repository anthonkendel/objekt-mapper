/**
 * Check if a value is a function.
 *
 * @param value the value to check.
 */
export function isFunction(
  value: unknown | null | undefined
): value is Function {
  return typeof value === "function" || value instanceof Function;
}
