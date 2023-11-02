import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signout } from "../services/auth";
import BlackButton from "../components/BlackButton";
import HamburgerMenu, { HamburgerButton } from "./HamburgerMenu";
import { useUserContext } from "../context/UserContext";
import { Logo } from "../utils/constants";
import Loader from "./Loader";

const Navbar = () => {
  const { user, loading, setLoading } = useUserContext();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    const { error } = await signout();
    window.location.reload();
    setLoading(false);
  };

  const handleMenuOpen = () => {
    setMenuOpen(!menuOpen);
    console.log("click");
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <nav className="flex items-center justify-between text-lg text-grayish font-medium mt-8 md:mt-12">
        <ul className="flex items-center gap-8">
          <li>
            <Link to="/">
              <img
                src={Logo}
                alt="YelpCamp"
              />
            </Link>
          </li>
          <li className="hidden lg:block">
            <Link
              to="/search"
              className="font-bold"
            >
              Home
            </Link>
          </li>
        </ul>
        <ul>
          <li className="hidden lg:block">
            <ul className="flex items-center gap-8">
              <li>
                {user ? (
                  <Link className="font-bold">{user.username}</Link>
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
          </li>

          <li className="lg:hidden">
            <HamburgerButton onClick={handleMenuOpen} />
          </li>
        </ul>
      </nav>
      <nav
        className={
          menuOpen
            ? ` h-48 overflow-hidden transition-all duration-300`
            : `h-0 overflow-hidden transition-all duration-300`
        }
      >
        <HamburgerMenu />
      </nav>
    </>
  );
};

export default Navbar;
