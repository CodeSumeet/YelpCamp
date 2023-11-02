import React from "react";
import { Link } from "react-router-dom";
import BlackButton from "../components/BlackButton";
import {
  Logo,
  HeroImage,
  HeroImageMT,
  CheckMark,
  Airbnb,
  Booking,
  PlumGuide,
} from "../utils/constants";

const Landing = () => {
  const list = [
    "Add your own camp suggestions.",
    "Leave reviews and experiences.",
    "See locations for all camps.",
  ];

  const partners = [
    {
      name: "airbnb",
      imgSrc: Airbnb,
      link: "https://www.airbnb.co.in/",
    },
    {
      name: "booking.com",
      imgSrc: Booking,
      link: "https://www.booking.com/",
    },
    {
      name: "plum guide",
      imgSrc: PlumGuide,
      link: "https://www.plumguide.com/",
    },
  ];

  return (
    <>
      <div className="grid max-lg:grid-cols-1 grid-cols-2 bg-beige">
        <div className="lg:mx-12 xl:mx-36">
          <header className="max-sm:my-8 sm:my-12 max-md:ml-4  md:max-lg:mx-8">
            <img
              src={Logo}
              alt="YelpCamp Logo"
              className="select-none"
            />
          </header>

          <img
            src={HeroImageMT}
            alt="Hero Image"
            className="w-full lg:hidden max-sm:h-72 object-cover select-none"
          />

          <div className="lg:mt-32 mt-8 max-md:ml-4  md:max-lg:ml-8 text-lg font-medium  text-gray">
            <h1 className="text-6xl max-sm:text-4xl text-black font-bold">
              Explore the best camps on Earth.
            </h1>

            <p className="my-2">
              YelpCamp is a curated list of the best camping spots on Earth.
              Unfiltered and unbiased reviews.
            </p>

            <ul>
              {list.map((item) => {
                return (
                  <li
                    key={item}
                    className="flex items-center gap-4 my-4"
                  >
                    <img
                      src={CheckMark}
                      alt="checkmark"
                      className="select-none"
                    />
                    <p>{item}</p>
                  </li>
                );
              })}
            </ul>

            <Link to="/search">
              <BlackButton
                text="View Campgrounds"
                className="w-56 h-16 mt-2 mb-8"
              />
            </Link>

            <h3>Partnered With:</h3>

            <ul className="flex items-center gap-6">
              {partners.map((partner) => {
                return (
                  <li key={partner.name}>
                    <Link
                      to={partner.link}
                      target="blank"
                    >
                      <img
                        src={partner.imgSrc}
                        alt={partner.name}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div>
          <img
            src={HeroImage}
            alt="Hero Image"
            className="hidden lg:block ml-auto select-none"
          />
        </div>
      </div>
    </>
  );
};

export default Landing;
