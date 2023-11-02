import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import postComment from "../services/postComment";
import { useUserContext } from "../context/UserContext";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import BlackButton from "../components/BlackButton";
import { Logo } from "../utils/constants";
import Loader from "../components/Loader";

const Comment = () => {
  const { user, loading, setLoading } = useUserContext();
  const { id } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState();

  const handleComment = async () => {
    setLoading(true);
    await postComment(id, user.user_id, user.username, comment);
    setLoading(false);

    navigate(`/campgrounds/${id}`);
  };

  return loading ? (
    <Loader />
  ) : (
    <div>
      <Banner />

      <div className="container text-gray text-base sm:text-lg font-medium">
        <Navbar />

        <form
          action=""
          onSubmit={handleComment}
          className="mx-auto w-full lg:w-3/6"
        >
          <h1 className="text-black text-4xl font-bold mt-8 md:mt-12 sm:mt-16 mb-4 md:mb-8">
            Add New Comment
          </h1>

          <label htmlFor="desc">Description</label>
          <textarea
            id="desc"
            name="desc"
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write something here..."
            className="w-full h-48 mt-2 mb-6 px-6 py-4 bg-[#F7F7F7] rounded"
          />

          <BlackButton
            type="submit"
            text="Post Comment"
            className="w-full h-16"
          />
        </form>

        <Link to="/">
          <img
            src={Logo}
            alt="YelpCamp"
            className="my-16 hidden sm:block"
          />
        </Link>
      </div>
    </div>
  );
};

export default Comment;
