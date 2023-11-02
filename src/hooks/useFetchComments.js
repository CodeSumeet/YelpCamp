import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const useFetchComments = (id) => {
  const [comments, setComments] = useState(null);
  const { setLoading } = useUserContext();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Comments")
          .select("*")
          .eq("campground_id", id);

        if (error) {
          throw error;
        }

        setComments(data);
      } catch (error) {
        console.log("Error fetching comments:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  return comments;
};

export default useFetchComments;
