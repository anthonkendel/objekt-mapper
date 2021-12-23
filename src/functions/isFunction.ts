export function isFunction(
  value: unknown | null | undefined
): value is Function {
  return typeof value === "function" || value instanceof Function;
}
