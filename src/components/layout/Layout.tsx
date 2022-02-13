import { useNavigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";

function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user.username}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}

export default function Layout() {
  return (
    <div>
      <Outlet />
      <AuthStatus />
    </div>
  );
}
