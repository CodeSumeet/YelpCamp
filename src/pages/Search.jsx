import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import InputButton from "../components/InputButton";
import BlackButton from "../components/BlackButton";
import WhiteButton from "../components/WhiteButton";
import { useUserContext } from "../context/UserContext";
import { useCampgroundContext } from "../context/CampgroundContext";
import { Logo } from "../utils/constants";
import Loader from "../components/Loader";

const Search = () => {
  const { loading } = useUserContext();
  const { campgrounds } = useCampgroundContext([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCampgrounds, setFilteredCampgrounds] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filtered = campgrounds.filter((campground) => {
        return campground.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      });
      setFilteredCampgrounds(filtered);
    } else {
      setFilteredCampgrounds(campgrounds);
    }
  }, [searchQuery, campgrounds]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Banner />
      <div className="container">
        <Navbar />
        <section className="flex flex-col justify-center gap-2.5 bg-beige text-gray text-base sm:text-lg font-medium rounded px-8 py-12 sm:px-16 sm:py-16 mt-8 md:mt-12">
          <h1 className="text-black text-4xl font-bold">
            Welcome to YelpCamp!
          </h1>

          <p>
            View our hand-picked campgrounds from all over
            <br className="hidden sm:block" /> the world, or add your own.
          </p>

          <div className="flex max-sm:flex-col items-center gap-4">
            <InputButton
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for camps"
              backgroundPosition="20px"
              paddingLeft="50px"
              className="w-full sm:w-64 bg-no-repeat bg-white border border-gray placeholder:text-gray"
            />

            <BlackButton
              text="Search"
              className="w-28 max-sm:w-full h-16"
            />
          </div>

          <Link
            to="/addcampground"
            className="underline w-min whitespace-nowrap"
          >
            Or add your own campground
          </Link>
        </section>

        <div className="grid max-sm:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 my-12 md:my-20">
          {filteredCampgrounds && filteredCampgrounds.length ? (
            filteredCampgrounds.map((campground) => {
              return (
                <div
                  key={campground.id}
                  className="w-full rounded border-2 border-lightGray p-4 text-gray text-lg font-medium flex flex-col gap-1 overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <img
                    src={campground.image_url}
                    alt={campground.name}
                    className="w-full h-48 bg-cover rounded"
                  />
                  <strong className="text-black">{campground.name}</strong>
                  <p>{campground.about}</p>

                  <Link to={`/campgrounds/${campground.uuid}`}>
                    <WhiteButton text="View Campground" />
                  </Link>
                </div>
              );
            })
          ) : (
            <h1>No campgrounds found.</h1>
          )}
        </div>

        <Link to="/">
          <img
            src={Logo}
            alt="YelpCamp"
            className="my-12 md:my-16"
          />
        </Link>
      </div>
    </div>
  );
};

export default Search;
