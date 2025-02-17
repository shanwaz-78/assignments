import React, { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext.tsx";

const UserForm: React.FC = () => {
  const { dispatch } = useUserContext();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userId = Math.random().toString(36).substring(7);
    dispatch({ type: "ADD_USER", payload: { id: userId, ...formData } });
    setIsDirty(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={(e) => {
          setFormData({ ...formData, name: e.target.value });
          setIsDirty(true);
        }}
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default UserForm;
