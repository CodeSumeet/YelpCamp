import toast from "react-hot-toast";
import { supabase } from "../config/supabaseClient";

const postComment = async (campgroundId, userId, username, comment) => {
  const { data, error } = await supabase.from("Comments").insert([
    {
      campground_id: campgroundId,
      user_id: userId,
      username: username,
      comment: comment,
    },
  ]);

  if (error) {
    console.log(error);
    toast.error("There was an error! Please try again.");
    return;
  }

  toast.success("Comment Posted Successfully!");
};

export default postComment;
