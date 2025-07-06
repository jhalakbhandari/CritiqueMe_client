import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDraftPostsByUserId,
  getPostsByUserId,
  type CreatePostPayload,
} from "../services/PostsService";
import type { User } from "../services/AuthService";
import axios from "axios";
import PostCard from "../components/PostCard";
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

const UserFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [showDrafts, setShowDrafts] = useState(false);
  const navigate = useNavigate();

  const userData = localStorage.getItem("user");
  if (!userData) throw new Error("No user found in localStorage");

  const parsedUser = JSON.parse(userData);
  const userId = parsedUser.id;

  const profilePicUrl = `${
    import.meta.env.VITE_BACKEND_URL
  }/api/user/${userId}/profile-picture?t=${Date.now()}`;

  const fetchPosts = async () => {
    try {
      const res = showDrafts
        ? await getDraftPostsByUserId(userId)
        : await getPostsByUserId(userId);
      setPosts(res);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${userId}`
      );
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user", err);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
  }, [showDrafts]);

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      {/* User Profile Info */}
      <div className="max-w-3xl mx-auto flex items-center space-x-6 mb-8">
        <img
          src={profilePicUrl}
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-blue-600 object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <div className="flex gap-4 text-sm text-gray-700 mt-2">
            <span>
              <strong>{user.posts?.length || 0}</strong> Posts
            </span>
            <span>
              <strong>{user.followers?.length || 0}</strong> Followers
            </span>
            <span>
              <strong>{user.following?.length || 0}</strong> Following
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="max-w-3xl mx-auto flex gap-4 mb-6">
        <button
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate("/posts/addPost")}
        >
          Add Post
        </button>
        <button
          className={`flex-1 ${
            showDrafts ? "bg-red-600" : "bg-blue-600"
          } text-white py-2 px-4 rounded hover:opacity-90`}
          onClick={() => setShowDrafts(!showDrafts)}
        >
          {showDrafts ? "Show Published Posts" : "See Draft Posts"}
        </button>
      </div>

      {/* Posts Section */}
      <div className="max-w-3xl mx-auto space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500">No posts to show.</div>
        ) : (
          posts.map((post: Post) => (
            <PostCard key={post.id} post={post} userId={userId} />
          ))
        )}
      </div>
    </div>
  );
};

export default UserFeed;
