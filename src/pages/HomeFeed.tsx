import { useEffect, useState } from "react";
import { getAllPosts } from "../services/PostsService";
import type { Post } from "./UserFeed";
import PostCard from "../components/PostCard";

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const userData = localStorage.getItem("user"); // assuming you stored user info as JSON
  if (!userData) throw new Error("No user found in localStorage");

  const parsedUser = JSON.parse(userData);
  const userId = parsedUser.id;
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        console.log("Fetched posts:", res);
        setPosts(res);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex justify-center py-8">
      <div className="w-full max-w-xl px-4 md:px-0 md:w-3/5">
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} userId={userId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
