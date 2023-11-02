import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadCampground from "../services/uploadCampground";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import InputButton from "../components/InputButton";
import BlackButton from "../components/BlackButton";
import { useUserContext } from "../context/UserContext";
import { Logo } from "../utils/constants";
import Loader from "../components/Loader";

const AddCampground = () => {
  const { user, loading, setLoading } = useUserContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: user?.user_id,
    username: user?.username,
    campName: "",
    price: "",
    url: "",
    about: "",
    desc: "",
  });

  Number(formData.price);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await uploadCampground(formData);
    setLoading(false);

    navigate("/search");
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="">
      <Banner />

      <div className="container text-gray text-base sm:text-lg font-medium">
        <Navbar />

        <form
          action=""
          onSubmit={handleSubmit}
          className="mx-auto w-full lg:w-3/6"
        >
          <h1 className="text-black text-4xl font-bold mt-12 sm:mt-16 mb-8">
            Add New Campground
          </h1>

          <label htmlFor="campName">Campground Name</label>
          <InputButton
            id="campName"
            name="campName"
            type="text"
            value={formData.campName}
            onChange={handleChange}
            placeholder="Campground name"
            className="w-full mt-3 mb-6"
          />

          <label htmlFor="price">Price</label>
          <InputButton
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="$ Price"
            className="w-full mt-3 mb-4"
          />

          <label htmlFor="url">Image</label>
          <InputButton
            id="url"
            name="url"
            type="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="www.image.com/url"
            className="w-full mt-3 mb-6"
          />

          <label htmlFor="about">About this place</label>
          <textarea
            id="about"
            name="about"
            type="text"
            value={formData.about}
            onChange={handleChange}
            placeholder="Write something about this place in short..."
            className="w-full mt-2 mb-6 px-6 py-4 bg-[#F7F7F7] rounded"
          />

          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            type="text"
            value={formData.desc}
            onChange={handleChange}
            placeholder="Write something here..."
            className="w-full mt-2 mb-6 px-6 py-4 bg-[#F7F7F7] rounded"
          />

          <BlackButton
            type="submit"
            text="Add Campground"
            className="w-full h-16"
          />
        </form>

        <Link to="/">
          <img
            src={Logo}
            alt="YelpCamp"
            className="my-16"
          />
        </Link>
      </div>
    </div>
  );
};

export default AddCampground;
