import { useEffect, useState } from "react";
import { getAllPosts } from "../services/PostsService";
import type { Post } from "./UserFeed";

function HomePage() {
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
  return (
    <div className="min-h-screen bg-gray-100  flex justify-center py-8">
      {/* Container with margins on large screen, full width on small */}
      <div className="w-full max-w-4xl px-4 md:px-0 md:w-3/5">
        {/* Feed container */}
        <div className="space-y-6">
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
    </div>
  );
}

export default HomePage;
