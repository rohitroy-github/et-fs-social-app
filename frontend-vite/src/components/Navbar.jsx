import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const Navbar = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("username"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(sessionStorage.getItem("username"));
    };

    // Listen for changes in sessionStorage (even from other tabs)
    window.addEventListener("storage", handleStorageChange);

    // Optional: also run when navigating within the same tab
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUsername(null); // manually update state
    navigate("/"); // redirect to home after logout
  };

  const handleLogin = () => {
    window.location.href = "https://et-fs-social-app.vercel.app/auth/login";
  };

  return (
    <div className="w-full max-w-5/6 mt-5 mx-auto flex justify-between items-center font-montserrat z-50 relative">
      <div className="absolute inset-0 opacity-20 z-0"></div>

      <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10 w-full flex justify-between items-center px-6 py-4 sm:flex-col sm:items-center sm:gap-4 md:flex-row md:gap-8">
      <Link to="/" className="text-xl font-bold text-white sm:text-center">
      Meta Instagram App
    </Link>

        {!username ? (
          <button
            onClick={handleLogin}
            className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-5 py-3 md:px-7 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-xs"
          >
            <FaInstagram className="text-xl md:text-md" />
            Connect with Instagram
          </button>
        ) : (
          <div className="flex items-center gap-4 sm:flex-col sm:gap-2 sm:items-center md:flex-row md:gap-4">


            {/* Navigation Links for Feed and Profile */}
            <div className="flex gap-4 sm:flex-col sm:gap-2 md:flex-row md:gap-6">
              <Link
                to={`/${username}/feed`} // Dynamically include the username
                className="text-white text-sm font-semibold md:text-lg"
              >
                Feed
              </Link>
              <Link
                to={`/profile`} // Assuming you have a profile route
                className="text-white text-sm font-semibold md:text-lg"
              >
                Profile
              </Link>
            </div>

            <p className="text-sm text-white sm:text-center md:text-lg">
              <span className="font-semibold text-lg">@{username}</span>
            </p>

            <button
              onClick={handleLogout}
              className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-6 py-3 md:px-8 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-xs"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
