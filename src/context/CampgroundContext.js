import { useContext, useEffect } from "react";
import { createContext, useState } from "react";
import { supabase } from "../config/supabaseClient";
import toast from "react-hot-toast";

const CampgroundContext = createContext();

export const CampgroundProvider = ({ children }) => {
  const [campgrounds, setCampgrounds] = useState(null);

  useEffect(() => {
    const getCampgrounds = async () => {
      const { data, error } = await supabase.from("Campgrounds").select("*");

      if (error) {
        console.log(error.message);
        toast.error(
          "There was an error fetching campgrounds! Please come back later."
        );
      }

      setCampgrounds(data);
    };

    getCampgrounds();

    return;
  }, []);

  return (
    <CampgroundContext.Provider value={{ campgrounds, setCampgrounds }}>
      {children}
    </CampgroundContext.Provider>
  );
};

export const useCampgroundContext = () => {
  const context = useContext(CampgroundContext);
  if (context === undefined) {
    throw new Error(
      "useCampgroundContext must be used within an CampgroundProvider"
    );
  }
  return context;
};

export default CampgroundContext;
