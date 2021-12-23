import { SourceTargetMap } from "./SourceTargetMap";

interface ABC {
  a: string;
  b: number;
  c: boolean;
}

interface ABCX {
  a: string;
  b: number;
  c: boolean;
  x: string;
}

test("that it matches defined maps", () => {
  const mapABCtoABCX: SourceTargetMap<ABC, ABCX> = {
    a: "a",
    b: undefined,
    c: null,
    x: (source) => `${source.a} + ${source.b} + ${source.c}`,
  };
  const mapABCXtoABC: SourceTargetMap<ABCX, ABC> = {
    a: "a",
    b: undefined,
    c: null,
  };

  expect(mapABCtoABCX).toMatchInlineSnapshot(`
    Object {
      "a": "a",
      "b": undefined,
      "c": null,
      "x": [Function],
    }
  `);
  expect(mapABCXtoABC).toMatchInlineSnapshot(`
    Object {
      "a": "a",
      "b": undefined,
      "c": null,
    }
  `);
});
