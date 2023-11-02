import toast from "react-hot-toast";
import { supabase } from "../config/supabaseClient";

const uploadCampground = async (campground) => {
  const { userId, username, campName, price, url, about, desc } = campground;

  const { data, error } = await supabase.from("Campgrounds").insert([
    {
      user_id: userId,
      username: username,
      name: campName,
      price,
      image_url: url,
      about: about,
      description: desc,
    },
  ]);

  if (error) {
    console.log(error);
    toast.error("There was an error. Please try again!");
    toast.error(error.message);
    return;
  }

  toast.success("Campground Added Successfully!");

  return;
};

export default uploadCampground;
