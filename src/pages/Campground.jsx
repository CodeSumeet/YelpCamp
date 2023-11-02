import React from "react";
import { format } from "timeago.js";
import { Link, useParams } from "react-router-dom";
import { AiOutlineMessage } from "react-icons/ai";
import { useUserContext } from "../context/UserContext";
import useFetchCampground from "../hooks/useFetchCampground";
import useFetchComments from "../hooks/useFetchComments";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import BlackButton from "../components/BlackButton";
import Loader from "../components/Loader";
import { Logo, Map } from "../utils/constants";

const Campground = () => {
  const { id } = useParams();
  const campgroundData = useFetchCampground(id);
  const comments = useFetchComments(id);
  const { loading } = useUserContext();

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Banner />

      <div className="container flex flex-col gap-4 sm:gap-6">
        <Navbar />

        <section className="flex flex-col-reverse md:flex-row gap-8 sm:gap-12 text-base sm:text-lg text-gray font-medium">
          <aside className="w-full h-min md:w-[45vw] px-6 sm:px-12 py-6 sm:py-12 rounded border-2 border-lightGray">
            <img
              src={Map}
              alt="map"
              className="w-full object-cover"
            />
          </aside>

          <div className="w-full flex flex-col gap-8">
            <div className="px-6 sm:px-12 py-6 sm:py-12 flex flex-col gap-4 rounded border-2 border-lightGray">
              <img
                src={campgroundData?.[0]?.image_url}
                alt={campgroundData?.[0]?.name}
                className="w-full rounded object-cover max-sm:h-52"
              />

              <div className="flex items-center justify-between text-black">
                <h1 className="text-lg sm:text-xl font-bold">
                  {campgroundData?.[0]?.name}
                </h1>
                <span className="font-medium text-base sm:text-lg">
                  ${campgroundData?.[0]?.price}/night
                </span>
              </div>

              <p>{campgroundData?.[0]?.description}</p>

              <i>Submitted by {campgroundData?.[0]?.username}</i>
            </div>

            <div className="px-6 sm:px-12 py-6 sm:py-12 flex flex-col gap-4 border-2 border-lightGray">
              {comments && comments.length !== 0 ? (
                comments.map((comment) => {
                  return (
                    <div
                      key={comment.id}
                      className="flex flex-col gap-4 border-b border-lightGray"
                    >
                      <div className="flex items-center justify-between">
                        <h1 className="text-lg sm:text-lg font-bold text-black">
                          {comment.username}
                        </h1>
                        <span className="font-medium text-base sm:text-base">
                          {format(comment.created_at)}
                        </span>
                      </div>

                      <p className="mb-6">{comment.comment}</p>
                    </div>
                  );
                })
              ) : (
                <div>Be the first to comment.</div>
              )}

              <Link to={`/campgrounds/${id}/comment`}>
                <BlackButton
                  text="Leave Review"
                  className="w-52 h-16 ml-0 md:ml-auto mt-4"
                  icon={<AiOutlineMessage size={24} />}
                />
              </Link>
            </div>
          </div>
        </section>

        <Link to="/">
          <img
            src={Logo}
            alt="YelpCamp"
            className="my-8 md:my-12"
          />
        </Link>
      </div>
    </div>
  );
};

export default Campground;
