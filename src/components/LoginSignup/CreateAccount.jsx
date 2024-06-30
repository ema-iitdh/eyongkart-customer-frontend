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
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden p-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div>
            <h1 className=" flex justify-center pt-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white">
              Create Account
            </h1>
            <div className="flex flex-col gap-6 mt-5  ">
              <input
                value={name}
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                value={email}
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="email"
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                type="button"
                className=" w-[100px] h-[50px] ml-[250px]  outline-none border-none bg-red-500 text-white text-[16px] text-center rounded-full cursor-pointer"
              >
                {loading ? "Creating" : "Create"}
              </button>
            </div>
            <p className=" text-black dark:text-white mt-6 text-[20px]">
              Already have an account?{" "}
              <span className="text-red-600 text-[20px]">
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
