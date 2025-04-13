import React from "react";

const PostCard = ({ media, onClick }) => {
  const { media_type, media_url, timestamp, id } = media;

  // Skip rendering if it's a carousel album
  if (media_type === "CAROUSEL_ALBUM") {
    return null;
  }

  return (
    <div
      onClick={() => onClick(media)}
      className="bg-white rounded-lg shadow-md p-4 font-montserrat cursor-pointer"
    >
      <div className="flex flex-col items-center">
        {/* Fixed size for the card */}
        <div className="w-64 h-80 bg-white flex justify-center items-center rounded-lg overflow-hidden">
          {/* Handle Image Media */}
          {media_type === "IMAGE" && (
            <img
              src={media_url}
              alt="Post"
              className="w-full h-full object-cover"
            />
          )}
        </div>

        <div className="mt-4 text-center">
          {/* Timestamp */}
          <p className="text-sm text-gray-600">{new Date(timestamp).toLocaleString()}</p>
          <p className="text-sm text-gray-600">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
