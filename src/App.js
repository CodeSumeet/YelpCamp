import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Search from "./pages/Search";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Campground from "./pages/Campground";
import AddCampground from "./pages/AddCampground";
import { UserProvider } from "./context/UserContext";
import { CampgroundProvider } from "./context/CampgroundContext";
import Comment from "./pages/Comment";
import { Toaster } from "react-hot-toast";
import YelpCampLogo from "./assets/YelpcampLogo.png";

function App() {
  const link = document.querySelector("link[rel='shortcut icon']");
  link.href = YelpCampLogo;

  return (
    <CampgroundProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={<Landing />}
            />
            <>
              <Route
                path="/search"
                element={<Search />}
              />
              <Route
                path="/signup"
                element={<Signup />}
              />
              <Route
                path="/signin"
                element={<Signin />}
              />
              <Route
                path="/addcampground"
                element={<AddCampground />}
              />
              <Route
                path="/campgrounds/:id"
                element={<Campground />}
              />
              <Route
                path="/campgrounds/:id/comment"
                element={<Comment />}
              />
            </>
          </Routes>
        </Router>

        <Toaster />
      </UserProvider>
    </CampgroundProvider>
  );
}

export default App;
