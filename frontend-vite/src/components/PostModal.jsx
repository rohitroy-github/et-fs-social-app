import React, { useState, useEffect } from "react";

const PostModal = ({ media, onClose }) => {
  if (!media) return null;

  const isCarousel = media.media_type === "CAROUSEL_ALBUM";
  const mediaItems = isCarousel ? media.children : [media];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = mediaItems[currentIndex];

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === mediaItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    const fetchComments = async () => {
      const accessToken = sessionStorage.getItem("access_token");
    
      if (!accessToken) return;
    
      try {
        const res = await fetch(
          `https://graph.instagram.com/${currentItem.id}/comments?fields=id,text,timestamp,username,like_count&access_token=${accessToken}`
        );
        const data = await res.json();
        console.log("Fetched Comments:", data);
        setComments(data.data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoadingComments(false);
      }
    };
    

    fetchComments();
  }, [currentItem.id]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg max-w-5xl w-full flex flex-row items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left: Media with arrows if carousel */}
        <div className="flex-shrink-0 w-1/2 relative">
          {isCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-10 h-10 opacity-50"
                style={{ zIndex: 1000 }}
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-10 h-10 opacity-50"
                style={{ zIndex: 1000 }}
              >
                ▶
              </button>
            </>
          )}
          <img
            src={currentItem.media_url}
            alt="Post"
            className="object-contain max-h-[80vh] mb-4"
          />
        </div>

        {/* Right: Comments */}
        <div className="w-1/2 max-h-[80vh] overflow-y-auto px-6">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 border-b border-gray-200 pb-2"
                >
                  <p className="font-semibold">@{comment.username}</p>
                  <p className="text-gray-800">{comment.text}</p>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>{new Date(comment.timestamp).toLocaleString()}</span>
                    <span>❤️ {comment.like_count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>

      {/* Bottom: Timestamp & Close */}
      <div className="absolute bottom-4 left-4 w-full text-center">
        <p className="text-gray-300 text-sm font-montserrat">
          {new Date(media.timestamp).toLocaleString()}
        </p>
        <button
          className="mt-2 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 font-montserrat"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostModal;
