import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [instaId, setInstaId] = useState(null);
  const [username, setUsername] = useState(null);
  const [profileName, setProfileName] = useState(null);
  const [profileBio, setProfileBio] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [followersCount, setFollowersCount] = useState(null);
  const [followsCount, setFollowsCount] = useState(null);
  const [mediaCount, setMediaCount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const uid = params.get("user_id");
    const username = params.get("user_name");

    const storedToken = token || sessionStorage.getItem("access_token");
    const storedUid = uid || sessionStorage.getItem("user_id");
    const storedUsername = username || sessionStorage.getItem("user_name");

    if (storedToken && storedUid) {
      setAccessToken(storedToken);
      setUserId(storedUid);
      setUsername(storedUsername);
      sessionStorage.setItem("access_token", storedToken);
      sessionStorage.setItem("user_id", storedUid);
      sessionStorage.setItem("user_name", storedUsername);

      axios
        .get(`${import.meta.env.VITE_BACKEND_BASE_URL}/user/profile`, {
          params: { access_token: storedToken },
        })
        .then((res) => {
          const data = res.data;

          // 🛠️ Debug: Log complete Instagram profile data fetched from backend
          // console.log("PROFILE_DATA:", data);

          setInstaId(data.id);
          setProfileName(data.name);
          setProfileBio(data.biography);
          setAccountType(data.account_type);
          setProfilePic(data.profile_picture_url);
          setFollowersCount(data.followers_count);
          setFollowsCount(data.follows_count);
          setMediaCount(data.media_count);

          sessionStorage.setItem("insta_id", data.id);
        })
        .catch((err) => {
          console.error("Failed to fetch Instagram profile data", err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading || !accessToken || !userId || !username) {
    return <Loader />;
  }

  return (
    <div className="relative font-montserrat text-white flex items-center justify-center min-h-screen">
      <div className="z-10 max-w-xl w-full bg-white/20 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative border border-white/20 flex flex-col items-center text-center gap-6">
        <h1 className="text-3xl font-bold sm:text-2xl xs:text-xl">
          Hey {profileName} 👋
        </h1>

        {profilePic && (
  <img
    src={profilePic}
    alt="Profile"
    className="w-28 h-28 rounded-full border-4 border-white shadow-lg sm:w-24 sm:h-24 xs:w-20 xs:h-20 transition-transform duration-300 hover:scale-105"
  />
)}


        <p className="text-lg font-semibold bg-white/20 border border-white/30 px-4 py-2 rounded-full shadow-inner sm:text-base xs:text-sm">
          @{username}
        </p>

        <div className="flex justify-center items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 border border-white/30 flex flex-col items-center justify-center text-xs font-semibold shadow-lg transition-transform duration-300 hover:scale-105">
            <p>{followersCount}</p>
            <p>Followers</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-white/20 border border-white/30 flex flex-col items-center justify-center text-xs font-semibold shadow-lg transition-transform duration-300 hover:scale-105">
            <p>{mediaCount}</p>
            <p>Posts</p>
          </div>
          <div className="w-20 h-20 rounded-full bg-white/20 border border-white/30 flex flex-col items-center justify-center text-xs font-semibold shadow-lg transition-transform duration-300 hover:scale-105">
            <p>{followsCount}</p>
            <p>Following</p>
          </div>
        </div>

        <div className="w-full text-left text-sm bg-white/10 border border-white/10 p-4 rounded-xl shadow-inner sm:text-xs xs:text-xs">
          <p>
            <span className="font-semibold">App User ID:</span> {userId}
          </p>
          <p>
            <span className="font-semibold">Instagram ID:</span> {instaId}
          </p>
          <p>
            <span className="font-semibold">Account Type:</span> {accountType}
          </p>
          <p>
            <span className="font-semibold">Profile Name:</span> {profileName}
          </p>
          <p>
            <span className="font-semibold">Bio:</span> {profileBio}
          </p>

          <p>
            <span className="font-semibold">Access Token:</span>
          </p>
          <div className="break-words text-xs text-white/70">{accessToken}</div>
        </div>

        <Link
          to={`/${username}/feed`}
          state={{ instaId }}
          className="cursor-pointer flex items-center justify-center gap-2 bg-gradient-to-r from-[#feda75cc] via-[#d62976cc] to-[#4f5bd5cc] text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 font-semibold text-sm sm:text-xs xs:text-xs"
        >
          Check out my feed
        </Link>
      </div>
    </div>
  );
};

export default ProfilePage;
