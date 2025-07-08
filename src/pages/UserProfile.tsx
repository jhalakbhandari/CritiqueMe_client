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
  const { id: paramUserId } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("user") || "{}");
  const currentUserId = localUser.id;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/${paramUserId}`
      );
      // console.log("response", res.data);

      setUser(res.data);
    };
    fetchUser();
  }, [paramUserId]);
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/user/follow-status/${paramUserId}?currentUserId=${currentUserId}`
        );
        setIsFollowing(res.data.isFollowing);
      } catch (err) {
        console.error("Failed to fetch follow status", err);
      }
    };

    if (currentUserId !== paramUserId) {
      fetchFollowStatus();
    }
  }, [paramUserId, currentUserId]);
  // console.log("paramUSerId", paramUserId);

  const handleFollowToggle = async () => {
    await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/follow/${paramUserId}`,
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 md:px-6 lg:px-8">
      {/* Profile Info */}
      {/* Profile Info - matched to UserFeed */}
      <div className="max-w-3xl mx-auto flex items-center space-x-6 mb-8">
        <img
          src={`${
            import.meta.env.VITE_BACKEND_URL
          }/api/user/${paramUserId}/profile-picture?t=${Date.now()}`}
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

          {currentUserId !== paramUserId && (
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

      {/* Posts Section - Same as UserFeed */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {user.posts.map((post: Post) => (
          <PostCard key={post.id} post={post} userId={paramUserId as string} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;
