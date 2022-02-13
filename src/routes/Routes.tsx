import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import useAuth from "../hooks/UseAuth";
import LoginPage from "../pages/Login";
function Dashboard() {
  return <h3>Dashboard</h3>;
}
function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/Dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Route>
      <Route path="*" element={<>404</>} />
    </Routes>
  );
}
