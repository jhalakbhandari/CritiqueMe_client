import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  email: string;
  exp: number;
}

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    // console.log("Navigating to dashboard with token:", token);

    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);
      localStorage.setItem("user", JSON.stringify({ ...decoded, token }));
      localStorage.setItem("token", token);
      // console.log("User saved in localStorage:", localStorage.getItem("user"));
      navigate("/homefeed");
    } else {
      // 🚨 Only redirect to login if no token AND no user in localStorage
      const userExists = localStorage.getItem("user");
      if (!userExists) {
        // console.log("Redirecting to login — no token and no user.");
        navigate("/login");
      }
    }
  }, [navigate]);

  return <div>Logging in...</div>;
};

export default AuthCallback;
