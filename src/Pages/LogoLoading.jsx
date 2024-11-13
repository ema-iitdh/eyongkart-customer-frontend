import React from "react";

const LogoLoading = () => {
  return (
    <div className="flex items-center justify-center w-full  h-screen bg-gray-100">
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div
        className="sm:w-28 sm:h-28  w-20 h-20 bg-center bg-no-repeat bg-contain  animate-pulse transform transition-all duration-1000 ease-in-out"
        style={{ backgroundImage: "url('logo.png')" }}
      ></div>
    </div>
  );
};

export default LogoLoading;
