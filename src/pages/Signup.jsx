import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../services/auth";
import InputButton from "../components/InputButton";
import BlackButton from "../components/BlackButton";
import { useUserContext } from "../context/UserContext";
import { Logo, UserTestimonial } from "../utils/constants";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const { setUser, loading, setLoading } = useUserContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password, username } = formData;
    const { data, error } = await signup(email, password, username);

    setUser(data);
    setLoading(false);

    navigate(-1);

    if (error) {
      console.log(error.message);
      toast.error(error.message);
      return;
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="flex max-lg:flex-col">
      <div className="lg:w-7/12 text-gray font-medium max-sm:px-4 max-sm:py-10 sm:px-12 sm:py-14 lg:px-[11vw]">
        <header className="flex items-center justify-between">
          <Link to="/">
            <img
              src={Logo}
              alt="YelpCamp"
            />
          </Link>

          <button onClick={goBack}>&larr; Back to campgrounds</button>
        </header>
        <form
          action=""
          onSubmit={handleSignUp}
        >
          <h1 className="text-black text-4xl font-bold py-8 lg:mt-10">
            Start exploring camps from all around the world.
          </h1>

          <label htmlFor="username">Username</label>
          <InputButton
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="john_doe91"
            className="w-full mt-2 mb-4"
          />

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
            <p>Already a user? </p>
            <Link
              to="/signin"
              className="text-cyan-500 underline font-semibold"
            >
              {" "}
              Sign in
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

export default Signup;
