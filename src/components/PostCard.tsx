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

  const profilePicUrl = `${import.meta.env.VITE_BACKEND_URL}/api/user/${
    user?.id
  }/profile-picture?t=${Date.now()}`;

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
    const commentElement = document.getElementById(`comment-${id}`);
    commentElement?.scrollIntoView({ behavior: "smooth" });
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
      className="bg-white p-6 rounded-lg shadow-md"
      style={{ backgroundColor: "rgb(1, 41, 95)" }}
    >
      <div className="flex">
        {/* Left: Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center mb-2">
            <img
              src={profilePicUrl}
              alt={`${user?.name}'s profile`}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <p className="text-sm text-gray-300">
                {createdAt ? getTimeAgo(createdAt) : "Posted recently"}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-100 mb-3">{description}</p>

          {/* Media */}
          <a
            href={media}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 underline break-words"
          >
            {media}
          </a>

          {/* Tags */}
          {Array.isArray(tags) && tags.length > 0 && (
            <div className="flex flex-wrap mt-4 gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Vertical Buttons */}
        <div className="flex flex-col items-center justify-start ml-6 space-y-4 mt-2">
          <button
            onClick={toggleLike}
            className="text-red-500 hover:scale-125 transition-transform"
          >
            {isLiked ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
          </button>

          <button
            onClick={handleCommentClick}
            className="text-white hover:text-blue-300"
          >
            <FaRegCommentDots size={22} />
          </button>

          <button
            onClick={handleShare}
            className="text-white hover:text-blue-300"
          >
            <FaShare size={22} />
          </button>
        </div>
      </div>

      {/* Optional Comment Section Placeholder */}
      <div id={`comment-${id}`} className="mt-6">
        <CommentSection postId={id} userId={userId} />
      </div>
    </div>
  );
};

export default PostCard;
