import React from "react";

const WhiteButton = (props) => {
  return (
    <button
      className={`bg-white text-lg text-black font-bold rounded-md border-2 border-lightGray w-full h-14 hover:bg-black hover:text-white active:bg-opacity-70 transition-all duration-150 select-none ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  );
};

export default WhiteButton;
