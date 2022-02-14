import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Dashboard from "../pages/DashBoard/Dashboard";
import Layout from "../components/layout/Layout";
import useAuth from "../hooks/UseAuth";
import LoginPage from "../pages/Login";

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  const token = localStorage.getItem("AppToken");

  if (!auth.user && !token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

export default function DashBoardRoutes() {
  return (
    <Routes>
      <Route path={`/admin`} element={"admin"} />
      <Route path={`/partners`} element={"partners"} />
    </Routes>
  );
}
