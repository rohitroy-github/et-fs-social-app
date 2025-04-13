const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://et-fs-social-app.vercel.app/auth/login";
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
      <h1 className="text-4xl font-bold text-center text-white mb-6 font-montserrat">
        Meta Instagram App
      </h1>
      <p className="text-white/80 text-center mb-8 font-montserrat">
        Connect with your Instagram profile and explore your content
      </p>
      <div className="flex justify-center">
        <button
          onClick={handleLogin}
          className="bg-white text-[#833ab4] hover:bg-[#fcb045] hover:text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-all duration-300 font-montserrat cursor-pointer"
        >
          Login with Instagram
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
