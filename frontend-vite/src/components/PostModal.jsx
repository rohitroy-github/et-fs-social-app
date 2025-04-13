import React, { useState } from "react";

const PostModal = ({ media, onClose }) => {
  if (!media) return null;

  // Support both single and carousel posts
  const isCarousel = media.media_type === "CAROUSEL_ALBUM";
  
  // Determine the items for the modal view
  const mediaItems = isCarousel ? media.children : [media];
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItem = mediaItems[currentIndex]

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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg max-w-3xl w-full flex flex-col items-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Navigation Arrows (only visible for carousels) */}
        {isCarousel && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-7 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-12 h-12 opacity-50"
              style={{ zIndex: 1000 }}
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute right-7 top-1/2 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-xl hover:bg-gray-100 cursor-pointer w-12 h-12 opacity-50"
              style={{ zIndex: 1000 }}
            >
              ▶
            </button>
          </>
        )}

        {/* Display current media */}
        <img
          src={currentItem.media_url}
          alt="Post"
          className="object-contain max-h-[80vh] mb-4"
        />

        <p className="text-gray-600 text-sm font-montserrat">
          {new Date(media.timestamp).toLocaleString()}
        </p>
        <button
          className="mt-4 bg-black text-white px-4 py-1 rounded hover:bg-gray-800 font-montserrat"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PostModal;
