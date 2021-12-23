import { isString } from "./isString";

test.each`
  input        | expected
  ${undefined} | ${false}
  ${null}      | ${false}
  ${1}         | ${false}
  ${0}         | ${false}
  ${-1}        | ${false}
  ${{}}        | ${false}
  ${[]}        | ${false}
  ${""}        | ${true}
  ${"true"}    | ${true}
  ${"false"}   | ${true}
  ${"foo"}     | ${true}
  ${String(0)} | ${true}
`("isString($input) === $expected", ({ input, expected }) => {
  expect(isString(input)).toBe(expected);
});
