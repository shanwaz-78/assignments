import React from "react";
import Counter from "../Counter/Counter.tsx";
import UserForm from "../UserForm/UserForm.tsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useUserContext } from "../../context/UserContext.tsx";

const Dashboard: React.FC = () => {
  const { state } = useUserContext();
  const data = state.users.map((user, index) => ({
    name: `User ${index + 1}`,
    email: user.email,
  }));

  return (
    <div>
      <Counter />
      <UserForm />
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="email" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default Dashboard;
