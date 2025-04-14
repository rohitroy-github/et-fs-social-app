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

// useEffect to fetch comments when the media item changes
useEffect(() => {
  const fetchComments = async () => {
    // Retrieve the access token from session storage
    const accessToken = sessionStorage.getItem("access_token");

    // If no access token is available, exit early
    if (!accessToken) return;

    try {
      // Make a request to the Instagram Graph API to fetch comments for the current media item
      const res = await fetch(
        `https://graph.instagram.com/${currentItem.id}/comments?fields=id,text,timestamp,username,like_count&access_token=${accessToken}`
      );

      // Parse the response data and set it to the comments state
      const data = await res.json();
      console.log("Fetched Comments:", data);
      setComments(data.data || []); // If no comments, set an empty array
    } catch (error) {
      // Log any errors encountered during the fetch operation
      console.error("Error fetching comments:", error);
    } finally {
      // Set the loading state to false once the fetch operation is complete (success or failure)
      setLoadingComments(false);
    }
  };

  // Fetch comments whenever the media item (currentItem) ID changes
  fetchComments();
}, [currentItem.id]); // Dependency array ensures effect runs when currentItem.id changes


  return (
    <div
      className="fixed inset-0 bg-black/50 bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-xl rounded-xl p-8 max-w-6xl w-full flex flex-col md:flex-row gap-6 font-montserrat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Media Carousel */}
        <div className="w-full md:w-1/2 relative justify-between items-center flex">
          {isCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition"
              >
                ▶
              </button>
            </>
          )}
          <img
            src={currentItem.media_url}
            alt="Post"
            className="object-contain max-h-[70vh] rounded-lg w-full"
          />
        </div>

        {/* Right Side: Comments */}
        <div className="w-full md:w-1/2 max-h-[70vh] overflow-y-auto px-2 flex flex-col justify-start items-start">
          <h2 className="text-white text-xl font-semibold mb-4">Comments</h2>
          {loadingComments ? (
            <p className="text-gray-300">Loading comments...</p>
          ) : comments.length > 0 ? (
            <div className="w-full">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 border-b border-gray-500 pb-2 text-white"
                >
                  <p className="font-semibold">@{comment.username}</p>
                  <p>{comment.text}</p>
                  <div className="flex justify-between text-sm text-gray-300 mt-1">
                    <span>{new Date(comment.timestamp).toLocaleString()}</span>
                    <span>❤️ {comment.like_count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments available.</p>
          )}
        </div>
      </div>

      {/* Bottom: Timestamp & Close */}
      <div className="absolute bottom-4 text-center">
        <p className="text-gray-300 text-sm font-montserrat mb-2">
          posted on {new Date(media.timestamp).toLocaleString()}
        </p>
        <button
          className="bg-white/10 border border-white/30 text-white px-5 py-2 rounded-lg hover:bg-white/20 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostModal;
