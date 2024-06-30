import React from "react";
import Navbar from "../Navbar/Navbar";
import Button from "../Shared/Button";
import Footer from "../Footer/Footer";
import { Link } from "@tiptap/extension-link";
const Contact = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="container text-2xl overflow-hidden rounded-3xl min-h-[550px] sm:min-h-[650px] hero-bg-color flex  items-center flex-col pt-8 gap-y-3.5">
          <div>
            <h1 className=" flex justify-center pt-4 font-semibold text-gray-500 hover:text-black dark:hover:text-white">
              Any query or comments can be asked.
            </h1>
            <div className="flex flex-col  gap-6 mt-5  ">
              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-1 "
                type="name"
                placeholder="Name"
              />

              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-1 "
                type="email"
                placeholder="Email Address"
              />
              <input
                className="w-[600px] h-[50px] text-xl rounded-none indent-2 outline-1 "
                type="text"
                placeholder="Phone number"
              />
              <textarea
                className="w-[600px] h-[70px] text-xl rounded-none indent-2  outline-1"
                type="comment"
                placeholder="Comments"
              />
              <button
                type="button"
                className=" w-[100px] h-[50px] ml-[250px]  outline-none border-none bg-red-500 text-white text-[16px] text-center rounded-full cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Contact;
