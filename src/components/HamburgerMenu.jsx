import React from "react";
import { Link } from "react-router-dom";
import { signout } from "../services/auth";
import BlackButton from "./BlackButton";
import { useUserContext } from "../context/UserContext";
import { Hamburger } from "../utils/constants";

const HamburgerMenu = () => {
  const { user } = useUserContext();

  const handleSignOut = async () => {
    const { error } = await signout();
    window.location.reload();
  };

  return (
    <ul className="flex flex-col items-center gap-8 bg-beige rounded py-6 mt-6">
      <li>
        {user ? (
          <Link className="font-bold">{user?.username}</Link>
        ) : (
          <Link
            to="/signin"
            className="font-bold"
          >
            Login
          </Link>
        )}
      </li>
      <li>
        {user ? (
          <button onClick={handleSignOut}>Logout</button>
        ) : (
          <Link to="/signup">
            <BlackButton
              text="Create an account"
              className="w-52 h-16"
            />
          </Link>
        )}
      </li>
    </ul>
  );
};

export const HamburgerButton = (props) => {
  return (
    <button
      onClick={props.onClick}
      className="bg-beige rounded p-2"
    >
      <img
        src={Hamburger}
        alt="menu"
      />
    </button>
  );
};

export default HamburgerMenu;
