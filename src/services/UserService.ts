import axios from "axios";

export interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
export const handleSignupUser = async (userData: CreateUserPayload) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/signup`,
      userData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating user", error);
    throw error;
  }
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axios.post(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    data
  );
  return response.data;
};
