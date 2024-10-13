import React, { useState } from "react";
// import "./LoginSignup.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import instance from "../../../api";
const CreateAccount = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    instance
      .post("/user/register", { role: "User", userName: name, email, password })
      // console.log(name,email,password);
      // setName("");
      // setEmail("");
      // setPassword("");
      .then((result) => {
        console.log(result);
        setLoading(false);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="ext-2xl overflow-hidden rounded-3xl min-h-svh sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div className="w-[70%]  flex flex-col items-center">
            <h1 className="pt-4 font-semibold sm:text-[20px] text-[16px] text-gray-500 hover:text-black dark:hover:text-white">
              Create Account
            </h1>
            <div className="w-[80%] flex flex-col text-center gap-3 m-8">
              <input
                className="sm:h-[50px] h-[30px] sm:text-[18px] text-[15px] rounded-lg indent-2 outline-none"
                type="name"
                placeholder="UserName"
                value={password}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="sm:h-[50px] h-[30px] sm:text-[18px] text-[15px] rounded-lg indent-2 outline-none"
                type="email"
                placeholder="Email"
                value={password}
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
                  {loading ? "Creating" : "Create"}
                </button>
              </div>
            </div>
            <p className="text-black dark:text-white  sm:text-[18px] text-[16px] pl-8">
              Already have an account?{" "}
              <span className="text-red-500 text-[16px]">
                <Link to="/login" type="button">
                  Login Here
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
