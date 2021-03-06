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
}

const defaultAuthValues = {
  loading: true,
  loginStatus: false,
  setLoginStatus: null,
  serverURL: "",
  isAdmin: false,
  setIsAdmin: null,
};

export const AuthContext =
  createContext<AuthContextInterface>(defaultAuthValues);

function AuthContextProvider(props: any) {
  const [loginStatus, setLoginStatus] = useState(false);
  const router = useRouter();
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
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

  useEffect(() => {
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
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
