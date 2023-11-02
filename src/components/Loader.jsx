import React from "react";
import { Rings } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute w-full h-full flex items-center justify-center">
      <Rings
        height="80"
        width="80"
        radius="9"
        color="beige"
        ariaLabel="rings-loading"
        // wrapperStyle
        // wrapperClass
      />
    </div>
  );
};

export default Loader;
