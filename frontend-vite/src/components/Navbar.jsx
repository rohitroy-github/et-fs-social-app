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
      <div className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 shadow-lg px-6 py-4 flex justify-between items-center font-montserrat z-50">
        <h1 className="text-xl font-bold text-white">Meta Instagram App</h1>
        <Link
          to="/"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition font-semibold"
        >
          Login with Instagram
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-600 shadow-lg px-6 py-4 flex justify-between items-center font-montserrat z-50">
      <h1 className="text-xl font-bold text-white">Meta Instagram App</h1>
      <div className="flex items-center gap-4">
        <p className="text-sm text-white">
          <span className="font-semibold">Username:</span> @{username}
        </p>
        <button
          onClick={handleLogout}
          className="text-sm text-red-200 hover:text-red-300 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
