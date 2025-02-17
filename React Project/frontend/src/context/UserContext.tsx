import React, { createContext, useContext, useReducer, useEffect } from "react";
import { State, Action } from "../types/context.types.ts";

const initialState: State = {
  count: 0,
  users: [],
};

const UserContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    case "ADD_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
      };
    default:
      return state;
  }
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const savedUsers = localStorage.getItem("users");
    if (savedUsers) {
      dispatch({ type: "ADD_USER", payload: JSON.parse(savedUsers) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(state.users));
  }, [state.users]);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
