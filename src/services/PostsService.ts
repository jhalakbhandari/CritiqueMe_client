import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export interface CreatePostPayload {
  title: string;
  description: string;
  tags?: string[] | string;
  media: string;
  status: string;
}

export const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

export const createPost = async (postData: CreatePostPayload) => {
  const token = getAuthToken();

  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/posts`, // your posts route
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Attach the JWT token here
        },
      }
    );

    return response.data; // This should be your created post response
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getAllPosts = async () => {
  // const token = await getAuthToken();
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.get(`${BACKEND_URL}/api/posts`, {
      // params: postData, // ✅ axios will convert this to URL query params
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.posts; // This should be your created post response
  } catch (error) {
    console.error("Error creating post:", error);
    throw error;
  }
};

export const getPostsByUserId = async (userId: string) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("User is not authenticated");
  }

  try {
    const response = await axios.get(
      `${BACKEND_URL}/api/posts/submitted/${userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // API returns: { message: "...", fetchedPosts: [...] }
    return response.data.fetchedPosts;
  } catch (error) {
    console.error("Error fetching posts by userId:", error);
    throw error;
  }
};
