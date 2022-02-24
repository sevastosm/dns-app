import { AuthProvider } from "./components/UI/DataTable/context/AuthContext";
import AppRoutes from "./routes/Routes";

export default function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </>
  );
}
