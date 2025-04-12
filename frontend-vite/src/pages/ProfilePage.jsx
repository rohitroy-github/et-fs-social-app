import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access_token");
    const uid = params.get("user_id");

    if (token && uid) {
      setAccessToken(token);
      setUserId(uid);
    }
  }, []);

  if (!accessToken || !userId) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-montserrat">
      <h1 className="text-3xl font-bold mb-4">Welcome, User {userId}</h1>
      <p className="text-lg">Access Token: <span className="text-gray-700 break-all">{accessToken}</span></p>
    </div>
  );
};

export default ProfilePage;
