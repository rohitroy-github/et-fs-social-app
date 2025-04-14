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
      className="bg-white/30 backdrop-blur-md border border-white/30 rounded-xl shadow-lg p-5 font-montserrat cursor-pointer transition-transform hover:scale-[1.02]"
    >
      <div className="flex flex-col items-center">
        {/* Fixed size for the card */}
        <div className="w-full h-80 bg-white/10 rounded-lg overflow-hidden flex justify-center items-center">
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

        <div className="mt-4 text-center text-white">
          <p className="text-sm text-white/80">
            posted at {new Date(timestamp).toLocaleString()}
          </p>
          <p className="text-xs text-white/80">{id}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
