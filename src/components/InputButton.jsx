import React from "react";
import { SearchIcon } from "../utils/constants";

const InputButton = (props) => {
  return (
    <div>
      <input
        required
        id={props.id}
        type={props.type}
        name={props.name}
        value={props.value}
        placeholder={props.placeholder}
        className={props.className}
        style={{
          height: "4rem",
          backgroundColor: "#F7F7F7",
          paddingInline: "1.5rem",
          borderRadius: "0.25rem",
          backgroundImage: props.backgroundImage,
          backgroundPosition: props.backgroundPosition,
          paddingLeft: props.paddingLeft,
        }}
        onChange={props.onChange}
      />
    </div>
  );
};

export default InputButton;
