import React, { useState, useEffect } from "react";
import { FaHeart, FaPen, FaTimes } from "react-icons/fa";
import axios from "axios";

const PostModal = ({ media, onClose }) => {
  if (!media) return null;

  const isCarousel = media.media_type === "CAROUSEL_ALBUM";
  const mediaItems = isCarousel ? media.children : [media];
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentItem = mediaItems[currentIndex];

  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [replying, setReplying] = useState(false);

  const getAccessToken = () => sessionStorage.getItem("access_token");

  // Fetch comments when currentItem changes
  useEffect(() => {
    fetchComments();
  }, [currentItem.id]);

  const fetchComments = async () => {
    const accessToken = getAccessToken();
    if (!accessToken) return;

    setLoadingComments(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/post/comment`,
        {
          params: {
            access_token: accessToken,
            media_id: currentItem.id,
          },
        }
      );

      const data = res.data;

      // Send the reply to the comment and log the response for debugging
      // The data contains the response from the Instagram API, confirming the reply was successfully posted.
      // console.log("FETCHED_COMMENTS:", data);

      setComments(data.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle sending a reply
  const handleSendReply = async () => {
    const accessToken = getAccessToken();
    if (!accessToken || !replyMessage.trim()) return;

    setReplying(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/user/post/comment/reply`,
        {
          access_token: accessToken,
          comment_id: replyToCommentId,
          message: replyMessage,
        }
      );

      // Log the reply sent response from the API to verify that the reply was successfully posted
      // console.log("Reply sent:", res.data);

      setReplyMessage("");
      setReplyToCommentId(null);
      await fetchComments();
    } catch (error) {
      console.error("Error sending reply:", error);
    } finally {
      setReplying(false);
    }
  };

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
      className="fixed inset-0 bg-black/50 bg-opacity-60 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="backdrop-blur-lg bg-black/10 border border-white/20 shadow-xl rounded-xl p-8 max-w-6xl w-full flex flex-col md:flex-row gap-6 font-montserrat"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Media */}
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
            <p className="text-gray-300 text-center font-semibold">
              Loading your comments
            </p>
          ) : comments.length > 0 ? (
            <div className="w-full">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="relative mb-4 border-b border-gray-500 pb-2 text-white"
                >
                  <p className="font-semibold text-xs">
                    @{comment.from.username} commented
                  </p>

                  {/* Comment Text */}
                  <p className="mt-1">{comment.text}</p>

                  {/* Like count + Reply button in the same row */}
                  <div className="flex justify-between items-center text-xs text-gray-300 mt-1">
                    <span className="flex items-center gap-1">
                      <FaHeart className="text-red-500" /> {comment.like_count}
                    </span>

                    <button
                      className="cursor-pointer p-2 rounded-full hover:bg-white/20 transition text-white"
                      onClick={() => {
                        setReplyToCommentId(comment.id);
                        setReplyMessage("");
                      }}
                    >
                      <FaPen />
                    </button>
                  </div>

                  {/* Timestamp in the top-right corner */}
                  <span className="absolute top-0 right-0 text-xs text-gray-300">
                    {new Date(comment.timestamp).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No comments available.</p>
          )}

          {/* Reply Input */}
          {replyToCommentId && (
            <div className="w-full mt-4 flex items-center gap-2">
              <input
                type="text"
                className="flex-grow px-3 py-2 rounded-md bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none"
                placeholder="Write a reply..."
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <button
                className="cursor-pointer bg-white/10 border border-white/30 text-white px-5 py-2 rounded-md hover:bg-white/20 transition"
                onClick={handleSendReply}
                disabled={replying}
              >
                {replying ? "Sending" : "Reply"}
              </button>
              <button
                className="cursor-pointer p-2 rounded-full hover:bg-white/20 transition text-white"
                onClick={() => setReplyToCommentId(null)}
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Info */}
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
