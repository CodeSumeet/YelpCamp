import toast from "react-hot-toast";
import { supabase } from "../config/supabaseClient";

export const signup = async (email, password, username) => {
  try {
    // Signing up the user
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;

    // Storing user data - username
    if (data) {
      const { data: insertedData, error: insertError } = await supabase
        .from("Users")
        .insert([{ user_id: data.user.id, username }]);

      if (insertError) throw insertError;
    }

    toast.success("Successfully Signed up!");
    return { data };
  } catch (error) {
    console.log("Error Signing up:", error);
    toast.error(error.message);
    return { error };
  }
};

export const signin = async (email, password) => {
  try {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;

    console.log(data);
    return { data };
  } catch (error) {
    return { error };
  }
};

export const signout = async () => {
  try {
    let { error } = await supabase.auth.signOut();

    if (error) throw error;

    return { error };
  } catch (error) {
    console.log(error.message);
    toast.error(error.message);
    return { error };
  }
};
