import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full border-5 border-t-transparent border-white animate-spin" />
        <div className="absolute inset-1 rounded-full shadow-inner" />
      </div>
    </div>
  );
};

export default Loader;
