import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";


const Navbar = () => {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  // Logout handler
  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/"); // Redirect to login page
  };

  const handleLogin = () => {
    window.location.href = "https://et-fs-social-app.vercel.app/auth/login";
  };

  // If username is not available, show login button
  if (!username) {
    return (
      <div className="w-full max-w-5/6 mt-5 mx-auto flex justify-between items-center font-montserrat z-50 relative">
        {/* Gradient Overlay for Glassmorphism */}
        <div className="absolute inset-0 opacity-20 z-0"></div>
        <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10 w-full flex justify-between items-center px-6 py-4 sm:flex-col sm:items-center sm:gap-4 md:flex-row md:gap-8">
          <h1 className="text-xl font-bold text-white sm:text-center">Meta Instagram App</h1>
          <button
  onClick={handleLogin}
  className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-5 py-3 md:px-7 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-xs"
s>
  <FaInstagram className="text-xl md:text-md" />
  Login with Instagram
</button>

        </div>
      </div>
    );
  }

  return (
<div className="w-full max-w-5/6 mt-5 mx-auto flex justify-between items-center font-montserrat z-50 relative">
  {/* Gradient Overlay for Glassmorphism */}
  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 opacity-10 z-0"></div>
  
  <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-3xl shadow-xl z-10 w-full flex justify-between items-center px-6 py-4 sm:flex-col sm:items-center sm:gap-4 md:flex-row md:gap-8">
    {/* Header Section */}
    <h1 className="text-xl font-bold text-white sm:text-center">Meta Instagram App</h1>

    {/* User Info & Logout Section */}
    <div className="flex items-center gap-4 sm:flex-col sm:gap-2 sm:items-center md:flex-row md:gap-4">
      {/* Username Display */}
      <p className="text-sm text-white sm:text-center md:text-lg">
        <span className="font-semibold text-lg">@{username}</span>
      </p>

      {/* Logout Button */}
      <button
  onClick={handleLogout}
  className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-6 py-3 md:px-8 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-xs"
>
  Logout
</button>


    </div>
  </div>
</div>

  
  );
};

export default Navbar;
