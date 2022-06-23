import "../styles/globals.css";
import "../styles/index.css";
import type { AppProps } from "next/app";
import AuthContextProvider from "../context/AuthContext";
import { useRouter } from "next/router";
import ProtectedRoute from "../components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";

const unProtectedPages = [
  "/Login",
  "/Signup",
  "/",
  "/Forget",
  "/ChangePassword",
];

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <AuthContextProvider>
      {unProtectedPages.includes(router.pathname) ? (
        <Component {...pageProps} />
      ) : (
        <ProtectedRoute>
          <Component {...pageProps} />
        </ProtectedRoute>
      )}
    </AuthContextProvider>
  );
}

export default MyApp;
