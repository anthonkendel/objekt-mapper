import { isDefined } from "./isDefined";

test.each`
  input        | expected
  ${undefined} | ${false}
  ${null}      | ${false}
  ${1}         | ${true}
  ${0}         | ${true}
  ${-1}        | ${true}
  ${{}}        | ${true}
  ${""}        | ${true}
  ${[]}        | ${true}
`("isDefined($input) === $expected", ({ input, expected }) => {
  expect(isDefined(input)).toBe(expected);
});
