// src/pages/LoginPage.jsx
const LoginPage = () => {
  const handleLogin = () => {
    window.location.href = "https://et-fs-social-app.vercel.app/auth/login";
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6 font-montserrat">
          Welcome to Meta Instagram App
        </h1>
        <p className="text-gray-600 text-center mb-8 font-montserrat">
          Login to connect with your Instagram account
        </p>
        <div className="flex justify-center">
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-700 transition duration-300 font-montserrat"
          >
            Login with Instagram
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
