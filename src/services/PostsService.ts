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
  return localStorage.getItem("authToken");
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
