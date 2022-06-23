import Link from "next/link";
import Head from "next/head";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import ToggleInputType from "../components/ToggleInputType";
import { AiFillHome } from "react-icons/ai";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup = () => {
  const [textOnBtn, setTextOnBtn] = useState("Register");
  const [inputType, setInputType] = useState("password");
  const router = useRouter();
  const [inputTypeConfirmPass, setInputTypeConfirmPass] = useState("password");
  const handleShowHidePassword = () => {
    if (inputType === "text") setInputType("password");
    else setInputType("text");
  };
  const handleGoogleSignup = async () => {
    window.open(serverURL + "/google", "_parent");
  };
  const handleShowHideConfirmPass = () => {
    if (inputTypeConfirmPass === "text") setInputTypeConfirmPass("password");
    else setInputTypeConfirmPass("text");
  };

  useEffect(() => {
    if (loginStatus) router.push("/Dashboard");
  });

  let { loginStatus, serverURL } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });
  const password = watch("password");
  const onSubmit = async (formData: any) => {
    console.log(formData);
    delete formData.cpassword;
    setTextOnBtn("Submitting...");

    const request = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    try {
      const response = await toast.promise(
        fetch(`${serverURL}/register`, request),
        {
          pending: "Please wait!",
          error: "Please Retry",
        }
      );
      const { message } = await response.json();
      if (response.status === 200) {
        toast.success("Please verify your email");
      } else if (response.status === 400) {
        toast.error(message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTextOnBtn("Register");
    }
  };
  if (!loginStatus) {
    return (
      <>
        <img src="./img/pic.jpg" height="40px" width="90px" />
        {/* <div className=" bg-[url('/img/Signup_BG.jpg')] bg-no-repeat bg-[length:100%_100%] h-full sm:h-screen flex justify-center items-center md:flex"> */}
        <div className="h-full sm:h-screen flex flex-col justify-center items-center md:flex font-sans">
          <Link href="/">
            <span className="flex cursor-pointer items-baseline">
              <AiFillHome /> Home
            </span>
          </Link>
          <div className=" mx-2 bg-white my-4 flex flex-col md:flex-row items-center max-w-screen-lg overflow-hidden rounded-3xl shadow-lg w-[80%] h-[60%] md:flex drop-shadow-2xl cursor-pointer">
            <div className="flex flex-1 justify-center">
              <img src="pictures/login_bg.png" className="w-[50%]" />
            </div>
            <div className="flex flex-1 justify-center bg-white">
              <ToastContainer />
              <div>
                <div></div>
                <div>
                  {/* welcome */}
                  <div>
                    <p className="font-mono text-2xl text-center font-bold text-blue-600 align-top scale-125">
                      Signup
                    </p>
                    <p className="font-mono text-2xl text-center font-bold align-top scale-75">
                      Create an Account
                    </p>
                  </div>
                  {/* Form */}
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="text-center pt-0">
                      <input
                        className="pl-4 border-2"
                        placeholder="Full Name"
                        type="text"
                        {...register("name", { required: true })}
                      />
                      {errors.name && errors.name.type == "required" && (
                        <div className="text-red-600 capitalize">
                          please enter your name
                        </div>
                      )}
                    </div>
                    <div className="text-center pt-1">
                      <input
                        className="pl-4 border-2"
                        placeholder="Email"
                        type="text"
                        {...register("email", { required: true })}
                      />
                      {errors.email && errors.email.type == "required" && (
                        <div className="text-red-600 capitalize">
                          please enter your email id
                        </div>
                      )}
                    </div>
                    <div className="text-center pt-1">
                      <input
                        className="pl-4 border-2"
                        placeholder="password"
                        type={inputType}
                        {...register("password", {
                          required: true,
                          minLength: 5,
                        })}
                      />
                      {/* <ToggleInputType
                    type={inputType}
                    onclick={handleShowHidePassword}
                    classStyle="absolute left-[90%] top-[10px]"
                  /> */}
                      {errors.password &&
                        errors.password.type === "required" && (
                          <p className="text-red-600 capitalize">
                            please enter your password
                          </p>
                        )}
                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <p className="text-red-600 capitalize">
                            please enter atleast 5 characters
                          </p>
                        )}
                    </div>
                    <div className="text-center pt-1">
                      <input
                        className="pl-4 border-2"
                        placeholder="confirm password"
                        type={inputTypeConfirmPass}
                        {...register("cpassword", {
                          required: true,
                          minLength: 3,
                          validate: value => {
                            console.log(errors);
                            return (
                              value === password || "Passwords do not match"
                            );
                          },
                        })}
                      />
                      {/* <ToggleInputType
                    type={inputTypeConfirmPass}
                    onclick={handleShowHideConfirmPass}
                    classStyle="absolute left-[90%] top-[10px]"
                  /> */}

                      {errors.cpassword &&
                        errors.cpassword.type === "required" && (
                          <div className="text-red-600 capitalize">
                            please confirm your password
                          </div>
                        )}
                      {errors.cpassword &&
                        errors.cpassword.type === "validate" && (
                          <div className="text-red-600 capitalize">
                            {errors.cpassword.message}
                          </div>
                        )}
                    </div>
                    <div className="pt-2 pl-9">
                      <div className="text-white bg-gradient-to-r from-purple-500 to-purple-900 rounded-2xl border-none shadow-lg w-40 justify-center items-center font-bold">
                        {" "}
                        <button className="w-full">{textOnBtn}</button>{" "}
                      </div>
                    </div>
                  </form>
                  {/* Links */}
                  <p className="text-center">OR</p>
                  <div className="flex flex-row border-2">
                    <div>
                      <img src="img/Google_logo.jpg" className="w-10 h-8" />
                    </div>
                    <button
                      className="w-full bg-blue-300"
                      onClick={handleGoogleSignup}
                    >
                      Continue With Google
                    </button>
                  </div>
                  <div className="pt-4">
                    <p className="text-center">
                      Already an User?
                      <Link href="/Login">
                        <a className="underline underline-offset-1">login</a>
                      </Link>
                    </p>
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

export default Signup;
