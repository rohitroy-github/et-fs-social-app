import React, { useState, useEffect } from "react";

const PostModal = ({ media, onClose }) => {
  if (!media) return null;

  // Support both single and carousel posts
  const isCarousel = media.media_type === "CAROUSEL_ALBUM";

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);
  
  // Determine the items for the modal view
  const mediaItems = isCarousel ? media.children : [media];
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = mediaItems[currentIndex];

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

    // Fetch comments for the media
    useEffect(() => {
        const fetchComments = async () => {
          const accessToken = sessionStorage.getItem("access_token");
    
          if (!accessToken) return;
    
          try {
            const res = await fetch(
              `https://graph.instagram.com/${currentItem.id}/comments?access_token=${accessToken}`
            );
            const data = await res.json();

            console.log(data);
            setComments(data.data);
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
        {/* Left part: Media */}
        <div className="flex-shrink-0 w-1/2 relative">
          {/* Navigation Arrows (only visible for carousels) */}
          {isCarousel && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-12 h-12 opacity-50"
                style={{ zIndex: 1000 }}
              >
                ◀
              </button>
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-12 h-12 opacity-50"
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

        {/* Right part: Comments */}
        <div className="w-96 pl-6 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          {loadingComments ? (
            <p>Loading comments...</p>
          ) : comments.length > 0 ? (
            <div>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <p className="font-semibold">{comment.text}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(comment.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No comments available.</p>
          )}
        </div>
      </div>

      {/* Timestamp and Close Button */}
      <div className="absolute bottom-4 left-4 w-full text-center">
        <p className="text-gray-600 text-sm font-montserrat">
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


// https://graph.instagram.com/17910257217071481/comments?access_token=IGAAOFIvMJ8exBZAE9RZA0hkaEUtVU10dmRmVWNLVUdSMnZAWZAzQwRnU2R20wUmdfa0gwR2FldV9qNlN6UldiYTJwMjF5dWs1cnVuSGpLQ2phRGQwWU5ucEJKQTRjSEhNMDhyMDBsa1FSOEJDZAXVvOXpJZAXJpUXdYMkh3TlltYVVRcEtTam9pWjRJb2Jn
