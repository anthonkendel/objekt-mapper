/**
 * Check if a value is defined, i.e. not null and not undefined.
 *
 * @param value the value to check.
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}
