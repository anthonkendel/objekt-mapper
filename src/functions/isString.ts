export function isString(value: unknown | null | undefined): value is string {
  return typeof value === "string";
}
