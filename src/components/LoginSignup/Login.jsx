import React, { useState } from "react";
// import "./LoginSignup.css";
import instance from "../../../api";
import Navbar from "../Navbar/Navbar";
import Button from "../Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/auth";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("successfully");
    setLoading(true);
    instance
      .post("/user/login", { email, password })
      // console.log(name,email,password);
      // setName("");
      // setEmail("");
      // setPassword("");
      .then((result) => {
        if (result.data.message) {
          setAuth({
            ...auth,
            message: result.data.message,
            token: result.data.token,
          });
          setLoading(false);
          localStorage.setItem("auth", JSON.stringify(result.data));
          navigate("/");
        }
        if (result.status === 400) {
          toast.error(result.data.message);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden p-6 mt-14">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5 ">
          <div>
            <h1 className=" flex justify-center pt-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white">
              Login
            </h1>
            <div className="flex flex-col  gap-6 mt-5 ">
              <input
                className="w-[100%] h-[50px] text-xl rounded-lg indent-2 outline-none "
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-[100%] h-[50px] text-xl rounded-lg indent-2 outline-none "
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                onClick={handleSubmit}
                type="button"
                className=" w-[100px] h-[50px]  outline-none border-none bg-red-500 text-white text-[16px] text-center rounded-full cursor-pointer"
              >
                {loading ? "Signing" : "Sign in"}
              </button>
            </div>
            <p className=" text-black dark:text-white mt-4 text-[20px] ">
              Forget Password?
              <span className="text-red-600">
                <Link to={"/createaccount"}> Create Account</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
