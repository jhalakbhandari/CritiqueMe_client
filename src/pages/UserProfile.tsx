import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
import type { Post } from "./UserFeed";
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  posts: Post[];
  followers: { id: string }[];
  following: { id: string }[];
}

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = localUser.id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${id}`
      );
      console.log("response", res.data);

      setUser(res.data);
    };
    fetchUser();
  }, [id]);
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/user/follow-status/${id}?currentUserId=${currentUserId}`
        );
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error("Failed to fetch follow status", err);
      }
    };

    if (currentUserId !== id) {
      fetchFollowStatus();
    }
  }, [id, currentUserId]);

  const handleFollowToggle = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/follow/${id}`,
      {
        followerId: currentUserId,
      }
    );
    setIsFollowing(!isFollowing);
    setUser((prevUser) =>
      prevUser
        ? {
            ...prevUser,
            followers: isFollowing
              ? prevUser.followers.filter((f) => f.id !== currentUserId)
              : [...prevUser.followers, { id: currentUserId }],
          }
        : null
    );
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-8 bg-gray-50">
      {/* Profile Header */}
      <div className="w-full max-w-3xl px-4">
        <div className="flex items-center space-x-6 ml-15 mb-6">
          <img
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/api/user/${id}/profile-picture`}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600 text-sm">{user.email}</p>
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
            {currentUserId !== id && (
              <button
                onClick={handleFollowToggle}
                className={`mt-2 px-4 py-1 rounded text-white text-sm ${
                  isFollowing ? "bg-red-500" : "bg-blue-600"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="w-full max-w-2xl px-4 space-y-4">
        {user.posts.map((post: Post) => (
          <PostCard key={post.id} post={post} userId={user.id} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
