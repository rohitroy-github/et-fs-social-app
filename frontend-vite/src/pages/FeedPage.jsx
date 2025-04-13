import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const FeedPage = () => {
  const location = useLocation();
  const { username } = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (location.state?.userId) {
      setUserId(location.state.userId);
    } else {
      // fallback if userId is lost (optional)
      const storedId = sessionStorage.getItem("insta_id");
      if (storedId) setUserId(storedId);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center font-montserrat">
      <h1 className="text-3xl font-bold mb-4">Feed for @{username}</h1>
      {userId ? (
        <p className="text-gray-600">User ID: {userId}</p>
      ) : (
        <p className="text-red-500">User ID not found</p>
      )}
    </div>
  );
};

export default FeedPage;
