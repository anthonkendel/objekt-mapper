import { SimpleMapper } from "./types/SimpleMapper";
import { User } from "./User";
import { UserDTO } from "./UserDTO";

const mapper = new SimpleMapper();

mapper.createMap<User, UserDTO>("user-to-userDTO", {
  firstName: null,
  lastName: undefined,
  fullName: (s) => `${s.firstName} ${s.lastName}`,
});
mapper.createMap<UserDTO, User>("userDTO-to-user", {
  firstName: "firstName",
  lastName: "lastName",
});

const defaultUser: User = {
  firstName: "John",
  lastName: "Doe",
};

const userDTO = mapper.map<User, UserDTO>("user-to-userDTO", defaultUser);
const user = mapper.map<UserDTO, User>("userDTO-to-user", userDTO);

console.log("DEBUG ~ userDTO", userDTO);
console.log("DEBUG ~ user", user);
