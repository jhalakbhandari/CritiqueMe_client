export const isAuthenticated = (): boolean => {
  const user = localStorage.getItem("user");
  if (!user) return false;

  try {
    const parsed = JSON.parse(user);

    if (!parsed.token) return false;

    // Try to decode the JWT to extract the expiration
    const payload = JSON.parse(atob(parsed.token.split(".")[1]));
    const isValid = payload.exp * 1000 > Date.now();

    return isValid;
  } catch (error) {
    console.error("Error decoding token:", error);
    return false;
  }
};
