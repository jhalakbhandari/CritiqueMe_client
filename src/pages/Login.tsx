/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { loginUser } from "../services/UserService";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await loginUser({ email, password });
      console.log("Login response:", res);
      localStorage.setItem("token", res.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ ...res.user, token: res.token })
      );

      console.log("Logging in, redirecting...");

      navigate("/dashboard");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Login failed.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/api/auth/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>
        {errorMsg && (
          <div className="mb-4 text-sm text-red-600 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full bg-yellow-400 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
