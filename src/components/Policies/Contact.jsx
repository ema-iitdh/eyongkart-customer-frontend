import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

const Contact = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 dark:text-white duration-200 overflow-hidden pt-16">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[650px] hero-bg-color text-center pt-8 gap-y-8 px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-4 hover:text-red-500">
            Got a Question or Comment?
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-2">
            We’re here to help! Please fill in the form below, and we’ll get
            back to you as soon as possible.
          </p>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-lg">
            <div className="flex flex-col gap-5">
              <input
                className="w-full h-[45px] text-base rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                type="text"
                placeholder="Your Name"
              />
              <input
                className="w-full h-[45px] text-base rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                type="email"
                placeholder="Email Address"
              />
              <input
                className="w-full h-[45px] text-base rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                type="tel"
                placeholder="Phone Number"
              />
              <textarea
                className="w-full h-[120px] text-base rounded-lg p-3 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="Your Comments"
              />

              <button
                type="button"
                className="w-full h-[45px] bg-red-500 text-white text-base rounded-lg hover:bg-red-600 transition duration-300"
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
