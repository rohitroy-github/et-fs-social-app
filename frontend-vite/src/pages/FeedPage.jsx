import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";
import Loader from "../components/Loader";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

const fetchPosts = async () => {
  const accessToken = sessionStorage.getItem("access_token");
  const userId = sessionStorage.getItem("user_id");

  if (!accessToken || !userId) {
    window.location.href = "/profile";
    return;
  }

  setLoading(true); // Optional loading state

  axios
    .get(`https://et-fs-social-app.vercel.app/user/posts`, {
      params: {
        access_token: accessToken,
        user_id: userId,
      },
    })
    .then((res) => {
      const posts = res.data;

      // 🛠️ Debug: Log fetched media posts
      console.log("MEDIA_POSTS:", posts);

      setMediaPosts(posts); // Assuming you store media data in state
    })
    .catch((err) => {
      console.error("❌ Failed to fetch media posts", err);
    })
    .finally(() => {
      setLoading(false);
    });
};

  const handleCardClick = (media) => {
    setSelectedPost(media);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container max-w-5xl min-h-screen pt-8 font-montserrat mx-auto relative">
      {posts.length === 0 ? (
        <div className="text-center text-white">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} media={post} onClick={handleCardClick} />
          ))}
        </div>
      )}

      <PostModal media={selectedPost} onClose={handleCloseModal} />
    </div>
  );
};

export default FeedPage;
