import React from "react";

const PostCard = ({ media, onClick }) => {
  const { media_type, media_url, timestamp, id, children } = media;

  // Determine the preview URL (carousel fallback to first child)
  let previewUrl = media_url;
  if (media_type === "CAROUSEL_ALBUM" && children?.length > 0) {
    previewUrl = children[0].media_url;
  }

  return (
    <div
      onClick={() => onClick(media)}
      className="bg-white rounded-lg shadow-md p-4 font-montserrat cursor-pointer"
    >
      <div className="flex flex-col items-center">
        {/* Fixed size for the card */}
        <div className="w-64 h-80 bg-white flex justify-center items-center rounded-lg overflow-hidden">
          {/* Handle different media types */}
          {media_type === "IMAGE" || media_type === "CAROUSEL_ALBUM" ? (
            <img
              src={previewUrl}
              alt="Post"
              className="w-full h-full object-cover"
            />
          ) : media_type === "VIDEO" ? (
            <video
              src={previewUrl}
              className="w-full h-full object-cover"
              muted
              autoPlay
              loop
            />
          ) : null}
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            {new Date(timestamp).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
