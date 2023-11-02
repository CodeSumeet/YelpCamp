import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import toast from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data: sessionUser, error } = await supabase.auth.getSession();

      if (error) {
        console.log("error", error.message);
        toast.error(error.message);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === "SIGNED_OUT") {
            setUser(null);
            return;
          } else if (session) {
            const { data: userProfile, error } = await supabase
              .from("Users")
              .select("user_id, username")
              .eq("user_id", sessionUser?.session?.user.id)
              .single();

            if (userProfile) {
              setUser({
                user_id: await userProfile.user_id,
                username: await userProfile.username,
              });
            } else if (error) {
              console.log("Error Fetching username", error);
              setTimeout(() => {
                toast.error(error.message);
              }, 1000);
              setLoading(false);
              return;
            } else {
              setUser(null);
            }
          }
        }
      );

      setLoading(false);
      return () => authListener?.subscription.unsubscribe();
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

export default UserContext;
