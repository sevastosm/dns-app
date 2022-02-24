import * as React from "react";
import { AuthContext } from "../components/UI/DataTable/context/AuthContext";
export default function useAuth() {
  return React.useContext(AuthContext);
}
