import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // <- Font Awesome icons
import InstagramConnectButton from "../components/InstagramConnectButton";

const Navbar = () => {
  const [username, setUsername] = useState(sessionStorage.getItem("user_name"));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUsername(sessionStorage.getItem("user_name"));
    };

    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUsername(null);
    navigate("/");
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <div className="container md:max-w-8xl lg:max-w-8xl mb-10 mt-8 mx-auto font-montserrat z-50 relative top-0 ">
      <div className="absolute inset-0 opacity-20 z-0"></div>

      <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10 w-full flex justify-between items-center px-6 py-4">
        <Link
          to="/"
          className="text-xl font-bold text-white sm:text-sm md:text-xl"
        >
          Instadesk
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          {!username ? (
            <InstagramConnectButton variant="navbar" />
          ) : (
            <>
              <div className="flex gap-6">
                <Link
                  to={`/${username}/feed`}
                  className="text-white text-lg font-semibold"
                >
                  Feed
                </Link>
                <Link
                  to={`/${username}/profile`}
                  className="text-white text-lg font-semibold"
                >
                  Profile
                </Link>
              </div>

              <p className="text-white text-lg font-semibold">@{username}</p>

              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg p-4 flex flex-col gap-4 z-50">
          {!username ? (
            <InstagramConnectButton variant="navbar" />
          ) : (
            <>
              <Link
                to={`/${username}/feed`}
                className="text-white text-base font-semibold"
                onClick={toggleMobileMenu}
              >
                Feed
              </Link>
              <Link
                to={`/${username}/profile`}
                className="text-white text-base font-semibold"
                onClick={toggleMobileMenu}
              >
                Profile
              </Link>
              <p className="text-white text-base font-semibold">@{username}</p>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-5 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 text-sm font-semibold"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
