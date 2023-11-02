import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useUserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const useFetchCampground = (id) => {
  const [campgroundData, setCampgroundData] = useState(null);
  const { setLoading } = useUserContext();

  useEffect(() => {
    const fetchCampground = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("Campgrounds")
          .select("*")
          .eq("uuid", id);

        if (error) {
          toast.error(error.message);
          throw error;
        }

        setCampgroundData(data);
      } catch (error) {
        console.log("Error fetching campground details:", error.message);
        toast.error("Error fetching campground details:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampground();
  }, [id]);

  return campgroundData;
};

export default useFetchCampground;
