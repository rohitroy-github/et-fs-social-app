import { FaInstagram } from "react-icons/fa";

// src/pages/LoginPage.jsx
const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://et-fs-social-app.vercel.app/auth/login";
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full font-montserrat">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-6xl p-8 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">Meta Instagram App</h1>
          <p className="text-white/80 text-base md:text-lg max-w-md">
            Seamlessly connect and interact with your Instagram business account. Monitor, manage, and respond smarter.
          </p>
        </div>

        {/* Divider (only visible on larger screens) */}
        <div className="hidden md:block w-[1px] bg-white/30"></div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">Let's setup</h2>
          <button
            onClick={handleLogin}
            className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-lg"
          >
            <FaInstagram className="text-xl md:text-2xl" />
            Connect my Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
