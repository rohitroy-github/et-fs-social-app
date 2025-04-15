// src/components/InstagramConnectButton.jsx
import { FaInstagram } from "react-icons/fa";

const InstagramConnectButton = ({ variant = "login_page" }) => {
  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_BASE_URL}/auth/login`;
  };

  // Define style variants
  const styles = {
    navbar: {
      button:
        "cursor-pointer flex items-center gap-2 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-5 py-3 md:px-7 md:py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-xs",
      icon: "text-xl md:text-md",
      text: "Connect with Instagram",
    },
    login_page: {
      button:
        "cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-6 py-3 md:px-8 md:py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-base md:text-lg",
      icon: "text-xl md:text-2xl",
      text: "Connect my Instagram",
    },
  };

  const { button, icon, text } = styles[variant] || styles.login_page;

  return (
    <button onClick={handleLogin} className={button}>
      <FaInstagram className={icon} />
      {text}
    </button>
  );
};

export default InstagramConnectButton;
