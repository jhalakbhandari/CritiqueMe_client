import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getPostsByUserId,
  type CreatePostPayload,
} from "../services/PostsService";
export type Post = CreatePostPayload & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  profileImg?: string;
  tags?: string[]; // Optional
  isLikedInitially?: boolean;
  link?: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  // Optional profileImg or other frontend-related fields can be added here too
};
function UserFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();
  const userData = localStorage.getItem("user"); // assuming you stored user info as JSON
  if (!userData) throw new Error("No user found in localStorage");

  const parsedUser = JSON.parse(userData);
  const userId = parsedUser.id;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsByUserId(userId);
        console.log("Fetched posts:", res); // ✅ Check this!
        setPosts(res);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const getTimeAgo = (dateStr: string) => {
    const createdDate = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - createdDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return "Posted today";
    if (diffDays === 1) return "Posted yesterday";
    return `Posted ${diffDays}d ago`;
  };
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="flex flex-col md:flex-row justify-center">
        {/* Left Sidebar Buttons (Only on md and up) */}
        <div className="hidden md:flex md:w-1/5 justify-start pr-4">
          <div className="sticky top-8 w-full space-y-2">
            <button
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              onClick={() => navigate("/posts/addPost")}
            >
              Add Post
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              See Draft Post
            </button>
          </div>
        </div>

        {/* Main Feed (3/5 on md+) */}
        <div className="w-full md:w-3/5 max-w-xl mx-auto">
          {/* Buttons for small screens */}
          <div className="block md:hidden mb-4 space-y-2">
            <button
              onClick={() => navigate("/posts/addPost")}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Add Post
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              See Draft Post
            </button>
          </div>

          {/* Posts Feed */}
          <div className="space-y-6">
            {posts.map(
              ({ id, title, description, media, tags, createdAt, user }) => {
                const profilePicUrl = `${
                  import.meta.env.VITE_BACKEND_URL
                }/api/user/${userId}/profile-picture?t=${Date.now()}`;

                return (
                  <div
                    key={id}
                    className="bg-white p-6 rounded-lg shadow-md"
                    style={{ backgroundColor: "rgb(1, 41, 95)" }}
                  >
                    {/* Header */}
                    <div className="flex items-center mb-2">
                      <img
                        src={profilePicUrl}
                        alt={`${user?.name}'s profile`}
                        className="w-10 h-10 rounded-full mr-3"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          {title}
                        </h2>
                        <p className="text-sm text-gray-300">
                          {createdAt
                            ? getTimeAgo(createdAt)
                            : "Posted recently"}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-100 mb-3">{description}</p>

                    {/* Media Link */}
                    {media && (
                      <a
                        href={media}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 underline break-words"
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
                            className="bg-blue-200 text-blue-900 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            )}
          </div>
        </div>

        {/* Right Spacer (Optional) */}
        <div className="hidden md:block md:w-1/5"></div>
      </div>
    </div>
  );
}

export default UserFeed;
