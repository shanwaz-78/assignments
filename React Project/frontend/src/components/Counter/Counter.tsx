import React from "react";
import { useUserContext } from "../../context/UserContext.tsx";
import { useSpring, animated } from "react-spring";

const Counter: React.FC = () => {
  const { state, dispatch } = useUserContext();
  const backgroundAnimation = useSpring({
    backgroundColor: `rgba(0, 100, 200, ${state.count / 100})`,
  });

  return (
    <animated.div style={{ ...backgroundAnimation }}>
      {" "}
      <h1>{state.count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
    </animated.div>
  );
};

export default Counter;
