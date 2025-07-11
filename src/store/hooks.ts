import { useEffect, useState } from "react";

export function isAuthenticated(): boolean {
  return !!localStorage.getItem("token");
}
export function useIsAdmin() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      const tokenData = localStorage.getItem("user");
      if (!tokenData) return;

      const user = JSON.parse(tokenData);
      setIsAdmin(user?.role === "admin");
    } catch (error) {
      console.error("Failed to parse user data:", error);
      setIsAdmin(false);
    }
  }, []);

  return isAdmin;
}
