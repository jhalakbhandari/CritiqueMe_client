import React, { useState } from "react";
import { FaHeart, FaRegHeart, FaRegCommentDots, FaShare } from "react-icons/fa";
import type { Post } from "../pages/UserFeed";
import CommentSection from "./CommentSection";
interface PostCardProps {
  post: Post;
  userId: string;
}
const PostCard: React.FC<PostCardProps> = ({ post, userId }) => {
  const {
    id,
    user,
    title,
    description,
    media,
    tags,
    createdAt,
    isLikedInitially = false,
  } = post;

  const [isLiked, setIsLiked] = useState(isLikedInitially);
  const [showCommentBox, setShowCommentBox] = useState(false);
  // const [showComments, setShowComments] = useState(false);

  const profilePicUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/api/user/${userId}/profile-picture?t=${Date.now()}`;

  const toggleLike = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/like`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );
    const data = await res.json();
    setIsLiked(data.liked);
  };

  const handleShare = () => {
    const url = `${window.location.origin}/posts/${id}`;
    navigator.clipboard.writeText(url);
    alert("Post URL copied to clipboard!");
  };

  const handleCommentClick = () => {
    setShowCommentBox((prev) => !prev);
    // setShowComments(false); // Optionally reset comment list on close
    setTimeout(() => {
      const commentElement = document.getElementById(`comment-${id}`);
      commentElement?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const getTimeAgo = (dateString: string) => {
    const diff = Date.now() - new Date(dateString).getTime();
    const mins = Math.floor(diff / (1000 * 60));
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "rgb(1, 41, 95)" }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left: Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center mb-3">
            <img
              src={profilePicUrl}
              alt={`${user?.name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white">
                {title}
              </h2>
              <p className="text-sm text-gray-300">
                {createdAt ? getTimeAgo(createdAt) : "Posted recently"}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-100 text-sm sm:text-base mb-3">
            {description}
          </p>

          {/* Media */}
          {media && (
            <a
              href={media}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline break-words text-sm"
            >
              {media}
            </a>
          )}

          {/* Tags */}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap mt-4 gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-xs sm:text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Buttons */}
        <div className="flex sm:flex-col justify-start items-center sm:items-center gap-4 mt-4 sm:mt-0 sm:ml-6">
          <button
            onClick={toggleLike}
            className="text-red-500 hover:scale-125 transition-transform"
          >
            {isLiked ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
          </button>

          <button
            onClick={handleCommentClick}
            className="text-white hover:text-blue-300"
          >
            <FaRegCommentDots size={20} />
          </button>

          <button
            onClick={handleShare}
            className="text-white hover:text-blue-300"
          >
            <FaShare size={20} />
          </button>
        </div>
      </div>

      {/* Comment Section */}
      <div id={`comment-${id}`} className="mt-6">
        <CommentSection
          postId={id}
          userId={userId}
          showInput={showCommentBox}
        />
      </div>
    </div>
  );
};

export default PostCard;
