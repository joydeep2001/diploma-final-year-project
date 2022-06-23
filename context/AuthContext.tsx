import { useRouter } from "next/router";
import { useState, createContext, useEffect } from "react";
import axios from "axios";

interface AuthContextInterface {
  loading: boolean;
  loginStatus: boolean;
  setLoginStatus: any;
  serverURL: string | undefined;
  isAdmin: boolean;
  setIsAdmin: any;
  logout: any;
}

const defaultAuthValues = {
  loading: true,
  loginStatus: false,
  setLoginStatus: null,
  serverURL: "",
  isAdmin: false,
  setIsAdmin: null,
  logout: null,
};

export const AuthContext =
  createContext<AuthContextInterface>(defaultAuthValues);

function AuthContextProvider(props: any) {
  const [loginStatus, setLoginStatus] = useState(false);
  const router = useRouter();
  let serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  //const serverURL = router.pathname;

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  async function getLoginStatus() {
    try {
      const res = await fetch(serverURL + "/login/status", {
        credentials: "include",
      });
      console.log(res);
      const result = await res.json();
      return { status: result.loginStatus, isAdmin: result.isAdmin };
    } catch (error) {
      console.log(error);
    }
    return { status: false, isAdmin: false };
  }
  const logout = async () => {
    try {
      const response = await fetch(serverURL + "/logout", {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data.message);
      setLoginStatus(false);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    // serverURL = window.location.origin;
    // serverURL.slice(0, -1);
    // serverURL += "5";
    // console.log(window.location);
    // console.log(serverURL);
    getLoginStatus().then(({ status, isAdmin }) => {
      setLoginStatus(status);
      setIsAdmin(isAdmin);
      setLoading(false);
    });
  }, [router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        loginStatus,
        setLoginStatus,
        serverURL,
        isAdmin,
        setIsAdmin,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
