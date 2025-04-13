import React from "react";

const PostModal = ({ media, onClose }) => {
  if (!media) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-4 rounded-lg max-w-3xl w-full flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={media.media_url} alt="Full Size" className="object-contain max-h-[80vh] mb-4" />
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
