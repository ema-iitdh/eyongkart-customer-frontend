import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Please enter your email.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted:", { email });

      setEmail("");
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <img
          src="/logo.png"
          alt=" Logo"
          className="h-8 mx-auto mb-4 object-contain"
        />

        <h2 className="text-lg font-semibold text-center mb-6">Sign In</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="emailOrPhone"
              className="block text-gray-700 font-bold text-[15px] mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="emailOrPhone"
              className="w-full h-8 sm:text-[15px] text-[12px] p-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
            {errors.email && (
              <p className="text-red-600 text-[10px] mt-1">{errors.email}</p>
            )}
          </div>
          <Link to="/">
            <button
              type="submit"
              className="w-full bg-red-400 text-white p-1 h-8 sm:text-[15px] text-[12px] rounded-md hover:bg-red-500 transition duration-300 font-semibold"
            >
              Continue
            </button>
          </Link>
        </form>

        {/* <p className="text-gray-600 mt-4 text-[12px] text-center">
          By continuing, you agree to Eyongkart's{" "}
          <a href="#" className="text-blue-500">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Notice
          </a>
          .
        </p> */}

        {/* <div className="text-center mt-4">
          <a href="#" className="text-blue-500 text-sm">
            Need help?
          </a>
        </div> */}

        <div className="border-t border-gray-300 mt-4 pt-4">
          <p className="text-center text-gray-600 text-[12px]">
            <a href="#" className="text-blue-500">
              Shop on Eyongkart Business
            </a>
          </p>
          <p className="text-center text-gray-600 text-[12px]">
            New to Eyongkart?{" "}
            <a href="/signup" className="text-blue-500">
              Create your Eyongkart account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
