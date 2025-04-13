import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import PostModal from "../components/PostModal";

const FeedPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const userId = sessionStorage.getItem("user_id");
      const accessToken = sessionStorage.getItem("access_token");

      if (!userId || !accessToken) {
        window.location.href = "/profile";
        return;
      }

      try {
        const mediaRes = await fetch(
          `https://graph.instagram.com/v22.0/${userId}/media?access_token=${accessToken}`
        );
        const mediaData = await mediaRes.json();

        const mediaDetailsPromises = mediaData.data.map(async (media) => {
          const baseRes = await fetch(
            `https://graph.instagram.com/${media.id}?fields=id,media_type,media_url,timestamp&access_token=${accessToken}`
          );
          const baseMedia = await baseRes.json();
        
          // If it's a carousel, fetch children
          if (baseMedia.media_type === "CAROUSEL_ALBUM") {
            const childrenRes = await fetch(
              `https://graph.instagram.com/${media.id}/children?access_token=${accessToken}`
            );
            const childrenData = await childrenRes.json();
        
            const childDetails = await Promise.all(
              childrenData.data.map(async (child) => {
                const childRes = await fetch(
                  `https://graph.instagram.com/${child.id}?fields=id,media_type,media_url,timestamp&access_token=${accessToken}`
                );
                return await childRes.json();
              })
            );
        
            return {
              ...baseMedia,
              children: childDetails,
            };
          }
        
          return baseMedia;
        });
        

        const allPosts = await Promise.all(mediaDetailsPromises);
        setPosts(allPosts);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleCardClick = (media) => {
    setSelectedPost(media);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  if (loading) {
    return <div className="text-center mt-20 text-xl font-montserrat">Loading posts...</div>;
  }

  return (
    <div className="min-h-screen p-8 font-montserrat relative">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Your Feed</h1>

      {posts.length === 0 ? (
        <div className="text-center">No posts found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} media={post} onClick={handleCardClick} />
          ))}
        </div>
      )}

      {/* Modal */}
      <PostModal media={selectedPost} onClose={handleCloseModal} />

    </div>
  );
};

export default FeedPage;
