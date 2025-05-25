// components/RedirectOnRoot.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RedirectOnRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token"); // adjust if you're using context/auth provider
    if (token) {
      navigate("/homefeed", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  return null; // or a loading spinner
};

export default RedirectOnRoot;