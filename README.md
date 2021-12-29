# Objekt Mapper

Objekt mapper supports mapping source and target objects. The aim is to provide a simple API without missing crucial features.

Inspired by [AutoMapper](https://github.com/AutoMapper/AutoMapper).

## Install

```bash
npm install --save objekt-mapper
```

## API

### Create new mapper instance

```typescript
import ObjektMapper from "objekt-mapper";

new ObjektMapper();
```

#### Example

```typescript
import ObjektMapper from "objekt-mapper";

const mapper = new ObjektMapper();
```

### Create a new map between source and target

```typescript
mapper.createMap<Target, Source>(key, map);
```

#### Example

```typescript
interface User {
  firstName: string;
  lastName: string;
}

interface UserDTO {
  fullName: string;
}

mapper.createMap<User, UserDTO>("UserToUserDTO", {
  fullName: (source) => `${source.firstName} ${source.lastName}`,
});
```

When creating a map the function expects a unique key and a map object. In the map object, the left side represents the target type properties and the right side represents the source type properties.

All properties in the target type must be mapped as properties keys while the source type properties can either use `null`, `undefined`, `string` or `function`.

```typescript
interface Contact {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface ContactDTO {
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
}

mapper.createMap<Contact, ContactDTO>("ContactToContactDTO", {
  name: undefined, // map target.name to source.name
  address: null, // map target.address to source.address
  email: "email" // map target.email to source.email,
  phoneNumber: (source) => source.phoneNumber // map target.phoneNumber to source.phoneNumber,
});
```

As seen in the example above when using `null` or `undefined` then the properties will automatically be mapped on the same property name.

### Map source object to a target object

```typescript
mapper.map<Source, Target>(key, source);
```

#### Example

```typescript
const user: User = {
  firstName: "John",
  lastName: "Doe",
};
const userDTO = mapper.map<User, UserDTO>("UserToUserDTO", user);

console.log(userDTO); // output: { fullName: "John Doe" }
```

## License

MIT © anthonkendel
