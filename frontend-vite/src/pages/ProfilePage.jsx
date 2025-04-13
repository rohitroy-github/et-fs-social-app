import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null); 
  const [instaId, setInstaId] = useState(null); 
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const uid = params.get("user_id");

    const storedToken = token || sessionStorage.getItem("access_token");
    const storedUid = uid || sessionStorage.getItem("user_id");

    if (storedToken && storedUid) {
      setAccessToken(storedToken);
      setUserId(storedUid);
      sessionStorage.setItem("access_token", storedToken);
      sessionStorage.setItem("user_id", storedUid);

      // Fetch Instagram ID & username
      axios
        .get(`https://graph.instagram.com/v22.0/me?fields=user_id,username&access_token=${storedToken}`)
        .then((res) => {
          const { user_id, username } = res.data;
          setInstaId(user_id);
          setUsername(username);
          sessionStorage.setItem("insta_id", user_id);
          sessionStorage.setItem("username", username);
        })
        .catch((err) => {
          console.error("Failed to fetch Instagram data", err);
        });
    }
  }, []);

  // Loading state
  if (!accessToken || !userId || !username) {
    return (
      <div className="text-center mt-20 text-xl font-montserrat text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative font-montserrat bg-gray-100 min-h-screen">
      {/* Floating Debug Auth Card */}
      <div className="absolute top-5 right-5 bg-white shadow-xl rounded-xl p-5 w-80 text-sm z-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">🔐 Auth Details</h2>
        <p className="text-gray-600">
          <span className="font-semibold">App User ID:</span> {userId}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">IG ID:</span> {instaId}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Username:</span> @{username}
        </p>
        <p className="text-gray-600 mt-2">
          <span className="font-semibold">Access Token:</span>
          <br />
          <span className="text-gray-500">{accessToken}</span>
        </p>
      </div>

      {/* Main Profile Content */}
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
        <div className="bg-white p-8 rounded-3xl shadow-2xl text-center w-full max-w-sm">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back 👋</h1>
          <p className="text-lg text-gray-600 mb-2">You’re logged in as:</p>
          <p className="text-xl font-medium text-indigo-600 mb-4">@{username}</p>
          <p className="text-sm text-gray-500">Here’s your profile information. Feel free to explore.</p>
        </div>

        {/* Feed Link Button */}
        <Link
          to={`/${username}/feed`}
          state={{ instaId }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-8 rounded-full transition duration-300 font-semibold shadow-md"
        >
          Go to Feed 📥
        </Link>

        {/* Optional Logout Button */}
        <button
          onClick={() => {
            sessionStorage.clear();
            navigate("/");  // Redirect to the home page after logout
          }}
          className="text-sm text-red-500 hover:text-red-700 mt-4 underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
