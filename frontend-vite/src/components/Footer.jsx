import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full max-w-5/6 mt-8 mx-auto flex justify-center items-center font-montserrat relative bottom-0 left-0 right-0 z-10">
      <div className="absolute inset-0 opacity-20 z-0"></div>

      <div className="bg-white/30 backdrop-blur-lg border border-white/20 rounded-2xl shadow-lg z-10 w-full px-5 py-3 flex justify-center items-center text-xs sm:text-sm text-white font-semibold text-center">
        <p className="flex items-center gap-2 flex-wrap justify-center">
          Powered by Meta Developer Tools | Rohit Roy | 2025 | 
          <a
            href="https://github.com/rohitroy-github/et-fs-social-app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:underline"
          >
            <FaGithub className="text-sm" />
            Github
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
