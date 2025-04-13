import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null); // Backend-provided user_id
  const [instaId, setInstaId] = useState(null); // Instagram actual ID
  const [username, setUsername] = useState(null);

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

      // Fetch IG ID & username
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

  if (!accessToken || !userId || !username)
    return (
      <div className="text-center mt-20 text-xl font-montserrat">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center relative font-montserrat">
      {/* Access Token & ID Card */}
      <div className="absolute top-5 right-5 bg-white shadow-lg rounded-xl p-4 w-80 text-sm break-words">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          🔐 Auth Details
        </h2>
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

      {/* Main Profile Section */}
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center w-[400px]">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome Back 👋
        </h1>
        <p className="text-gray-600">You’re logged in as:</p>
        <p className="text-xl font-medium text-indigo-600 mt-2">
          @{username}
        </p>
      </div>

      <Link
        to={`/${username}/feed`}
        state={{ instaId }}
        className="mt-6 inline-block bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition font-semibold"
      >
        Go to Feed 📥
      </Link>
    </div>
  );
};

export default ProfilePage;
