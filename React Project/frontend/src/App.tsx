import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoutes.tsx";
import PublicRoute from "./routes/PublicRoutes.tsx";
import Dashboard from "./components/Dashboard/Dashboard.tsx";
import Auth from "./components/Auth/Auth.tsx";
import { UserProvider } from "./context/UserContext.tsx";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Auth />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
