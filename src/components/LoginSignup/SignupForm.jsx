import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupForm = () => {
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");

  // Validation states
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Name validation (must not be empty)
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }

    // Mobile number validation (simple check for 10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number.";
    }

    // Password validation (at least 6 characters, with letters and numbers)
    if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    } else if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
      newErrors.password = "Password must contain both letters and numbers.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      // If no errors, proceed with form submission
      console.log("Form submitted:", { name, mobileNumber, password });
      // Clear the form after submission (optional)
      setName("");
      setMobileNumber("");
      setPassword("");
      setErrors({});
    } else {
      // Set validation errors
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <img
          src="/logo.png"
          alt="logo"
          className="h-8 mx-auto mb-4 object-contain"
        />
        <h2 className="text-lg font-semibold text-center mb-6">
          Create Account
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold text-[15px] mb-2"
            >
              Your name
            </label>
            <input
              type="text"
              id="name"
              className="w-full h-8 sm:text-[15px] text-[12px] p-2 border border-gray-300 rounded-md"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <p className="text-red-600 text-[10px] mt-1">{errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="mobileNumber"
              className="block text-gray-700 font-bold text-[15px] mb-2"
            >
              Mobile number
            </label>
            <div className="flex">
              <select className="p-2 h-8 sm:text-[15px] text-[12px] border border-gray-300 rounded-md mr-2">
                <option value="+91">IN +91</option>
                {/* Add more country codes if needed */}
              </select>
              <input
                type="tel"
                id="mobileNumber"
                className="w-full p-2 border h-8 sm:text-[15px] text-[12px] border-gray-300 rounded-md"
                placeholder="Mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-red-600 text-[10px] mt-1">
                {errors.mobileNumber}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-bold text-[15px] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 h-8 sm:text-[15px] text-[12px] border border-gray-300 rounded-md"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p className="text-red-600 text-[10px] mt-1">{errors.password}</p>
            )}
          </div>
          <Link to="/login">
            <button
              type="submit"
              className="w-full bg-red-400 text-white p-1 h-8 sm:text-[15px] text-[12px] rounded-md hover:bg-red-500 transition duration-300 font-semibold"
            >
              Verify mobile number
            </button>
          </Link>
        </form>

        <p className="text-center text-gray-600 mt-4 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Sign In
          </a>
        </p>

        {/* <p className="text-center text-xs text-gray-500 mt-4">
          By creating an account or logging in, you agree to Eyongkart's{" "}
          <a href="#" className="text-blue-500">
            Conditions of Use
          </a>{" "}
          and{" "}
          <a href="#" className="text-blue-500">
            Privacy Policy
          </a>
          .
        </p> */}
      </div>
    </div>
  );
};

export default SignupForm;
