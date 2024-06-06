import React from "react";
// import "./LoginSignup.css";
import Navbar from "../Navbar/Navbar";
import Button from "../Shared/Button";
import { Link } from "react-router-dom";
const CreateAccount = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden p-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div>
            <h1 className=" flex justify-center pt-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white">
              Create Account
            </h1>
            <div className="flex flex-col  gap-6 mt-5  ">
              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="name"
                placeholder="Name"
              />
              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="email"
                placeholder="Email Address"
              />
              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-none "
                type="password"
                placeholder="Password"
              />
              <Link to={"/"} className="flex ml-5 justify-center ">
                <Button
                  text="Create"
                  bgColor="bg-primary"
                  textColor="text-white"
                />
              </Link>
            </div>
            <p className=" text-black dark:text-white mt-6 text-[20px]">
              Already have an account?{" "}
              <span className="text-red-600 text-[20px]">
                <Link to={"/login"}> Login Here</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
