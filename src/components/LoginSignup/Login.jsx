import React, { useState } from "react";
// import "./LoginSignup.css";
import Navbar from "../Navbar/Navbar";
import Button from "../Shared/Button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../Context/auth";
import { Axios } from "../../../api";
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
    Axios.post("/user/login", { email, password })
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
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="text-2xl overflow-hidden rounded-3xl min-h-svh sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div className="w-[70%]  flex flex-col items-center">
            <h1 className="pt-4 font-semibold sm:text-[20px] text-[16px] text-gray-500 hover:text-black dark:hover:text-white">
              Login
            </h1>
            <div className="w-[80%] flex flex-col text-center gap-3 m-8">
              <input
                className="w-full sm:h-[50px] h-[30px] sm:text-[18px] text-[15px] rounded-lg indent-2 outline-none"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="sm:h-[50px] h-[30px] sm:text-[18px] text-[15px] rounded-lg indent-2 outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="w-[80px] h-[30px] bg-red-500 text-white text-[16px] rounded-full cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                >
                  {loading ? "Signing" : "Sign in"}
                </button>
              </div>
            </div>
            <p className="text-black dark:text-white  sm:text-[18px] text-[16px] pl-8">
              Forget Password?{" "}
              <span className="text-red-500 text-[16px]">
                <Link to="/createaccount">Create Account</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
