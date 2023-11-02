import React from "react";

const BlackButton = (props) => {
  return (
    <button
      className={`bg-black flex items-center justify-center gap-4 text-lg text-white font-medium rounded-md hover:bg-opacity-80 active:bg-opacity-70 transition-all duration-150 select-none ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.icon}
      {props.text}
    </button>
  );
};

export default BlackButton;
