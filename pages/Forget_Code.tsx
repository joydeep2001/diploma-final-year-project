import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ToggleInputType from "../components/ToggleInputType";

const Code = () => {
  const [textOnBtn, setTextOnBtn] = useState("Login");
  const [inputType, setInputType] = useState("password");
  const router = useRouter();
  const handleShowHidePassword = () => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };
  let { loginStatus, setLoginStatus, serverURL, setIsAdmin, isAdmin } =
    useContext(AuthContext);

  useEffect(() => {
    if (loginStatus) {
      if (isAdmin) router.push("/admin/Dashboard");
      else router.push("/Dashboard");
    }
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");
  const handleGoogleLogin = async () => {
    window.open(serverURL + "/google", "_self");
  };
  const onSubmit = async (formData: any) => {
    console.log(formData);
    setTextOnBtn("Submitting...");

    const request = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    let result;
    try {
      const response = await toast.promise(
        fetch(`${serverURL}/login`, request),
        {
          pending: "Please wait!",
          error: "Please Retry",
        }
      );
      const { message, isAdmin } = await response.json();
      if (response.status === 200) {
        setLoginStatus(true);
        setIsAdmin(isAdmin);
        toast.success("Logged In successfully");
        if (isAdmin) router.push("/admin/Dashboard");
        else router.push("/Dashboard");
      } else if (response.status === 400) {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTextOnBtn("Login");
    }
  };
  if (!loginStatus) {
    return (
      <>
        <div className=" bg-[url('/img/Forget_BG.jpg')] bg-no-repeat bg-[length:100%_100%] h-screen sm:h-screen flex justify-center items-center md:flex">
          <div className=" mx-2 bg-white my-4 flex flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl shadow-lg w-full md:flex drop-shadow-2xl cursor-pointer">
            <div className="flex"><img src="img/B.jpg" className="w-[100%] h-[100%]" /></div>
            <div className="flex bg-white">
              <ToastContainer />
              <div>
                <div>
                  <div>
                    {/* welcome */}
                    <div >
                    <h1>Please  check  your  email . . . .</h1>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="text-center pt-10">
                        <input className="pl-10 border-2  "
                          placeholder="Enter the code"
                          type="text"
                          {...register("email", { required: true })}
                        />
                        {errors.email && errors.email.type == "required" && (
                          <div className="text-red-600 ">please enter the code</div>
                        )}
                      </div>
                      {/* Resend code ---------------- */}
                      <div className="text-center pl-2 pt-4">
                      <button className="underline underline-offset-1">Resend code</button>
                      </div>
                      <Link href="/html">
                      <div className="pt-14 pl-10">
                        <div className="text-white bg-blue-400 w-40 h-10 justify-center items-center pt-2">
                          {" "}
                          <button className="w-full">Login</button>
                        </div>
                      </div>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Code;



