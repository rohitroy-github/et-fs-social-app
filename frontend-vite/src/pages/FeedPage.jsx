// src/pages/FeedPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      const token = localStorage.getItem("access_token");
      const res = await axios.get("/api/feed", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    };
    fetchFeed();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {posts.map((post) => (
        <div key={post.id} className="bg-white rounded shadow p-2">
          <img src={post.media_url} alt="Post" className="rounded" />
          <p>{post.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default FeedPage;
