import React, { useEffect, useState } from "react";

interface Comment {
  id: string;
  text: string;
  user: {
    name: string;
  };
}

interface CommentSectionProps {
  postId: string;
  userId: string;
  showInput: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  userId,
  showInput,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [visibleCount, setVisibleCount] = useState(2);

  const [text, setText] = useState("");
  //   console.log("postid", postId);

  const fetchComments = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/comments`
    );
    const data = await res.json();
    setComments(data.comments.comments);
    setVisibleCount(1);
  };

  const submitComment = async () => {
    if (!text.trim()) return;
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${postId}/comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, userId }),
      }
    );
    setText("");
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="mt-4 space-y-3">
      {/* Comment Input */}
      {showInput && (
        <div className="flex mt-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="border p-2 flex-1 rounded-l bg-white text-black"
          />
          <button
            onClick={submitComment}
            className="bg-blue-500 text-white px-4 rounded-r"
          >
            Post
          </button>
        </div>
      )}
      {/* List of Comments */}
      {/* Comments List */}
      {comments.length > 0 && (
        <>
          {comments.slice(0, visibleCount).map((c) => (
            <div key={c.id} className="text-sm text-gray-100">
              <strong className="text-yellow-400">{c.user?.name}</strong>{" "}
              {c.text}
            </div>
          ))}

          {/* View More / Hide Toggle */}
          {comments.length > 2 && (
            <button
              onClick={() =>
                visibleCount >= comments.length
                  ? setVisibleCount(0)
                  : setVisibleCount((prev) => prev + 2)
              }
              className="text-blue-400 text-sm mt-1 hover:underline"
            >
              {visibleCount >= comments.length
                ? "Hide comments"
                : "View more comments"}
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CommentSection;
