import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../services/auth";
import InputButton from "../components/InputButton";
import BlackButton from "../components/BlackButton";
import { useUserContext } from "../context/UserContext";
import { Logo, UserTestimonial } from "../utils/constants";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Signin = () => {
  const { loading, setLoading } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { email, password } = formData;
    const { data, error } = await signin(email, password);

    // setUser(data);

    if (error) {
      setError(error.message);
      console.log(error.message);
      toast.error(error.message);
      return;
    }

    setLoading(false);
    navigate("/search");

    window.location.reload();
  };

  const goBack = () => {
    navigate(-1);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="h-screen flex max-lg:flex-col">
      <div className="lg:w-7/12 text-gray font-medium max-sm:px-4 max-sm:py-10 sm:px-12 sm:py-14 lg:px-[11vw]">
        <header className="flex items-center justify-between">
          <Link>
            <img
              src={Logo}
              alt="YelpCamp"
            />
          </Link>

          <button
            className=""
            onClick={goBack}
          >
            &larr; Back to campgrounds
          </button>
        </header>
        <form
          action=""
          onSubmit={handleSignin}
        >
          <h1 className="text-black text-4xl font-bold py-8 lg:mt-10">
            Start exploring camps from all around the world.
          </h1>

          <label htmlFor="email">Email</label>
          <InputButton
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-2 mb-4"
          />

          <label htmlFor="password">Password</label>
          <InputButton
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full mt-2 mb-6"
          />

          <BlackButton
            type="submit"
            text="Create an account"
            className="w-full h-16"
          />

          <div className="flex mt-4 text-lg">
            <p>Not a user yet? </p>
            <Link
              to="/signup"
              className="text-cyan-500 underline font-semibold"
            >
              {" "}
              Create an account
            </Link>
          </div>
        </form>
      </div>
      <div className="lg:w-5/12 flex items-center justify-center bg-beige max-sm:px-4 max-sm:py-10 sm:px-12 sm:py-14 lg:px-[11vw]">
        <section>
          <h1 className="max-sm:text-xl text-2xl font-bold leading-relaxed">
            "YelpCamp has honestly saved me hours of research time, and the
            camps on here are definitely well picked and added."
          </h1>

          <div className="flex items-center gap-4 mt-4 text-gray font-semibold">
            <img
              src={UserTestimonial}
              alt="user"
            />

            <div>
              <strong className="text-black">May Andrews</strong>
              <p>Professional Hiker</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signin;
