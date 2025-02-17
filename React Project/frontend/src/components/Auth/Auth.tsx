import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext.tsx";

const Auth: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { dispatch } = useUserContext();
  const navigate = useNavigate();

  const handleLogin = () => {
    const userId = Math.random().toString(36).substring(7);
    dispatch({
      type: "ADD_USER",
      payload: { id: userId, name: "John Doe", address: "", email, phone: "" },
    });
    navigate("/dashboard");
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Auth;
