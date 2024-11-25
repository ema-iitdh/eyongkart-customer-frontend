import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-4 max-w-[600px] mx-auto space-y-2 ">
      <h1 className="text-2xl font-bold lg:text-4xl">{title}</h1>
      <p className="text-xs text-gray-700">{subtitle}</p>
    </div>
  );
};

export default Heading;
