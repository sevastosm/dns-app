import * as React from "react";
import { getToken, makeRequest } from "../../../../api/fetch";

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
interface AuthContextType {
  user: { username: string; password: string; id: string; roles: string[] };
  signin: (username: string, password: string, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  setPartners: (data: any) => void;
  partners: any;
}

export const AuthContext = React.createContext<AuthContextType>(null!);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<any>(null);
  const [partners, setPartners] = React.useState<any>(null);

  const signin = async (
    username: string,
    password: string,
    callback: VoidFunction
  ) => {
    const token = await getToken({ username, password });
    const user = await makeRequest(
      "GET",
      `/api/accounts/UserByName/${username}`
    );
    return fakeAuthProvider.signin(() => {
      token && setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      localStorage.removeItem("AppToken");
      localStorage.removeItem("user");

      setUser(null);
      callback();
    });
  };

  React.useEffect(() => {
    if (user) return;
    const u: any = localStorage.getItem("user");
    const userData: any = JSON.parse(u);
    userData && setUser(userData);
  }, []);

  let value = { user, partners, signin, signout, setPartners };

  console.log("STATE OF THE APP", value);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
