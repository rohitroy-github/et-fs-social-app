import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  // If username is not available, show login button
  if (!username) {
    return (
      <div className="w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center font-montserrat z-50 relative">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 opacity-30 z-0"></div>

        <h1 className="text-xl font-bold text-black z-10">Meta Instagram App</h1>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition font-semibold z-10"
        >
          Login with Instagram
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white shadow-lg px-6 py-4 flex justify-between items-center font-montserrat z-50 relative">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 opacity-30 z-0"></div>

      <h1 className="text-xl font-bold text-black z-10">Meta Instagram App</h1>
      <div className="flex items-center gap-4 z-10">
        <p className="text-sm text-black">
          <span className="font-semibold">Username:</span> @{username}
        </p>
        <button
          onClick={handleLogout}
          className="text-sm text-red-500 hover:text-red-700 transition z-10"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
