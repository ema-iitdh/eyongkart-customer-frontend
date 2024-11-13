// Spinner.js
import React from "react";

export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
      <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-b-4 border-transparent border-t-red-500 border-b-red-500"></div>
    </div>
  );
};
