import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts, type CreatePostPayload } from "../services/PostsService";
export type Post = CreatePostPayload & {
  id: string;
  userId: string;
  createdAt: string;
  updatedAt?: string;
  profileImg?: string;
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

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        console.log("Fetched posts:", res); // ✅ Check this!
        setPosts(res);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="flex flex-col md:flex-row justify-center">
        {/* Left side (1/5) - Add Post button on large screens */}
        <div className="hidden md:flex md:w-1/5 justify-start pr-4">
          <div className="sticky top-8 w-full space-y-1">
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

        {/* Center (3/5) - Feed */}
        <div className="w-full md:w-3/5">
          {/* Add Post button for small screens */}
          <div className="block md:hidden mb-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Add Post
            </button>
          </div>

          {/* Scrollable Feed Container */}
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 hide-scrollbar">
            {posts.map(({ id, profileImg, title, description, link }) => (
              <div
                key={id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={profileImg}
                    alt={`${title} profile`}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                </div>
                <p className="text-gray-800 dark:text-gray-200 mb-3">
                  {description}
                </p>
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Right side (1/5) - Empty space */}
        <div className="hidden md:block md:w-1/5"></div>
      </div>
    </div>
  );
}

export default UserFeed;
