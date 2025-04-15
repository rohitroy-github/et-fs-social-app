import InstagramConnectButton from "../components/InstagramConnectButton";

// src/pages/LoginPage.jsx
const LoginPage = () => {

  return (
    <div className="flex justify-center items-center min-h-screen w-full font-montserrat">
      <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl w-full max-w-6xl p-8 md:p-12 flex flex-col md:flex-row gap-8">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-5">
            Meta Instagram App
          </h1>
          <p className="text-white/80 text-base md:text-lg max-w-md">
            Seamlessly connect and interact with your Instagram business
            account. Monitor, manage, and respond smarter.
          </p>
        </div>

        {/* Divider (only visible on larger screens) */}
        <div className="hidden md:block w-[1px] bg-white/30"></div>

        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-5">
            Let's setup
          </h2>
          <InstagramConnectButton variant="login_page" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
