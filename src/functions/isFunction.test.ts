import { isFunction } from "./isFunction";

test.each`
  input                       | expected
  ${undefined}                | ${false}
  ${null}                     | ${false}
  ${1}                        | ${false}
  ${0}                        | ${false}
  ${-1}                       | ${false}
  ${{}}                       | ${false}
  ${""}                       | ${false}
  ${[]}                       | ${false}
  ${() => undefined}          | ${true}
  ${function () {}}           | ${true}
  ${{ f: () => undefined }.f} | ${true}
`("isFunction($input) === $expected", ({ input, expected }) => {
  expect(isFunction(input)).toBe(expected);
});
