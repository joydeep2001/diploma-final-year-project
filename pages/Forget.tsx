import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ToggleInputType from "../components/ToggleInputType";

const Forget = () => {
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
        fetch(`${serverURL}/login`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(formData),
        }),
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
            <div className="flex">
              <img src="img/B.jpg" className="w-[100%] h-[100%]" />
            </div>
            <div className="flex bg-white">
              <ToastContainer />
              <div>
                <div>
                  <div>
                    {/* welcome */}
                    <div>
                      <p className="font-mono text-2xl text-center font-bold text-blue-600 align-top scale-125">
                        Recover Password
                      </p>
                      <p className="align-top text-center pt-6 scale-60">
                        Provide Account Details
                      </p>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="text-center pt-4">
                        <input
                          className="pl-4 border-2"
                          placeholder="Email"
                          type="text"
                          {...register("email", { required: true })}
                        />
                        {errors.email && errors.email.type == "required" && (
                          <div className="text-red-600 ">
                            please enter your email id
                          </div>
                        )}
                      </div>
                      <div className="pt-4 pl-7">
                        <div className="text-white bg-blue-400 w-40 h-10 justify-center items-center pt-2">
                          {" "}
                          <Link href="/Forget_Code">
                            <button className="w-full">PROCEED</button>
                          </Link>
                        </div>
                      </div>
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

export default Forget;
