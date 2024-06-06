import React from "react";

const Button = ({ text, bgColor, textColor, handler = () => {} }) => {
  return (
    <button
      className={`${bgColor} ${textColor} cursor-pointer  hover:scale-105  duration-300  px-1 py-2 rounded-full related z-10  w-[110px] h-[58px]`}
    >
      {text}
    </button>
  );
};

export default Button;
