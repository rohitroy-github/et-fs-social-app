// src/pages/PostDetails.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const PostDetails = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [replyText, setReplyText] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const token = localStorage.getItem("access_token");
      const res = await axios.get(`/api/post/${postId}/comments`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(res.data);
    };
    fetchComments();
  }, [postId]);

  const replyToComment = async (commentId) => {
    const token = localStorage.getItem("access_token");
    await axios.post(
      `/api/comment/${commentId}/reply`,
      { text: replyText },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setReplyText("");
  };

  return (
    <div>
      {comments.map((c) => (
        <div key={c.id} className="p-2 border-b">
          <p>{c.text}</p>
          <input
            type="text"
            placeholder="Reply..."
            className="border p-1"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button
            onClick={() => replyToComment(c.id)}
            className="bg-blue-500 text-white px-2 py-1 ml-2"
          >
            Reply
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;
