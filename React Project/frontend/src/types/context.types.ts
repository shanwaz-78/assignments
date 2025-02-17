export type User = {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
};

export type PartialUserType = Partial<User>;

export type State = {
  count: number;
  users: User[];
};

export type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "RESET" }
  | { type: "ADD_USER"; payload: User }
  | { type: "DELETE_USER"; payload: string };