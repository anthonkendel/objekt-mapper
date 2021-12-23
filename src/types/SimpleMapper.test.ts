import { SimpleMapper } from "./SimpleMapper";

interface FullMetadata {
  created: Date;
  description: string;
  id: number;
  name: string;
  owner: {
    name: string;
    email: string;
    admin: boolean;
  };
}

interface BasicMetadata {
  created: string;
  description: string;
  name: string;
  ownerEmail: string;
  ownerName: string;
}

const emptyMapper = new SimpleMapper();
const mapper = new SimpleMapper();

const MapperKeys = {
  FullToBasicMetadata: "FullToBasicMetadata",
  BasicToFullMetadata: "BasicToFullMetadata",
};

mapper.createMap<FullMetadata, BasicMetadata>(MapperKeys.FullToBasicMetadata, {
  created: (source) => source.created.toISOString(),
  description: null,
  name: undefined,
  ownerEmail: (source) => source.owner?.email,
  ownerName: (source) => source.owner?.name,
});

mapper.createMap<BasicMetadata, FullMetadata>(MapperKeys.BasicToFullMetadata, {
  created: (source) => new Date(source.created),
  description: "description",
  id: null,
  name: undefined,
  owner: (source) => ({
    name: source.ownerName,
    email: source.ownerEmail,
    admin: false,
  }),
});

const fullMetadata: FullMetadata = {
  created: new Date("2021-12-21"),
  description: "This is the description of Full Metadata",
  id: 1337,
  name: "Full Metadata",
  owner: {
    admin: false,
    email: "full@example.xom",
    name: "Meta Data",
  },
};
const basicMetadata: BasicMetadata = {
  created: "2021-12-20",
  description: "This is the description of Basic Metadata",
  name: "Basic Metadata",
  ownerEmail: "basic@example.xom",
  ownerName: "Basic Metadata",
};

test("that is throws on unknown map", () => {
  expect(() => emptyMapper.map("test", {})).toThrowError("test map not found!");
});

test("that it maps from 'bigger' source to  'smaller' target", () => {
  const result = mapper.map<FullMetadata, BasicMetadata>(
    MapperKeys.FullToBasicMetadata,
    fullMetadata
  );

  expect(result).toEqual({
    created: "2021-12-21T00:00:00.000Z",
    description: "This is the description of Full Metadata",
    name: "Full Metadata",
    ownerEmail: "full@example.xom",
    ownerName: "Meta Data",
  });
});

test("that it maps from 'smaller' source to 'bigger' target", () => {
  const result = mapper.map<BasicMetadata, FullMetadata>(
    MapperKeys.BasicToFullMetadata,
    basicMetadata
  );

  expect(result).toEqual({
    created: new Date("2021-12-20"),
    description: "This is the description of Basic Metadata",
    id: null,
    name: "Basic Metadata",
    owner: {
      admin: false,
      email: "basic@example.xom",
      name: "Basic Metadata",
    },
  });
});
