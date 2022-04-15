import { Routes, Route } from "react-router-dom";
import useAuth from "../hooks/UseAuth";
import Admin from "../pages/Admin/Admin";
import Partners from "../pages/Partners/Partners";
import PartnerStatus from "../views/partners/PartnersStatus";

export default function DashBoardRoutes() {
  const { user } = useAuth();
  const superAdmin = user?.roles.includes("SuperAdmin");

  return (
    <Routes>
      {superAdmin && <Route path={`/admin`} element={<Admin />} />}
      <Route path={`/partners`} element={<Partners />} />
      <Route path={`/partners-status`} element={<PartnerStatus />} />
    </Routes>
  );
}
