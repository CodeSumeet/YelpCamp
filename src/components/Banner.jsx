import React, { useState } from "react";
import { Close } from "../utils/constants";
import { Link } from "react-router-dom";

const Banner = () => {
  const [hide, setHide] = useState(false);
  const handleClose = () => {
    setHide(true);
  };

  return (
    <div
      className={
        hide
          ? "hidden"
          : "bg-black text-white text-base sm:text-lg font-semibold sm:font-semibold flex items-center justify-center sm:gap-8 py-2"
      }
    >
      <p className="text-center max-sm:mx-12">
        This project was made by{" "}
        <Link
          target="blank"
          to="https://github.com/CodeSumeet"
          className="text-cyan-300 underline"
        >
          Sumeet Tiwari
        </Link>{" "}
        and designed by{" "}
        <Link
          target="blank"
          to="https://www.codewell.cc/"
          className="text-cyan-300 underline"
        >
          Codewell
        </Link>
      </p>
      <button
        className="w-8 max-sm:mr-4"
        onClick={handleClose}
      >
        <img
          src={Close}
          alt="close"
        />
      </button>
    </div>
  );
};

export default Banner;
