import { Routes, Route } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Admin from "../pages/Admin/Admin";
import Partners from "../pages/Partners/Partners";

export default function DashBoardRoutes() {
  const { user } = useAuth();
  console.log("user", user);
  const superAdmin = user?.roles.includes("SuperAdmin");

  return (
    <Routes>
      {superAdmin && <Route path={`/admin`} element={<Admin />} />}
      <Route path={`/partners`} element={<Partners />} />
    </Routes>
  );
}
