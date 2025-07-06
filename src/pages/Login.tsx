/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/AuthService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await login({ email, password }); // just call login, it handles storage now
      console.log("Login response:", res);

      navigate("/homefeed");
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message || "Login failed.");
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/google`;
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-h-screen flex flex-col md:flex-row items-center justify-center"
      style={{ backgroundColor: "rgb(1, 41, 95)" }}
    >
      {/* Left Side - Branding */}
      <div className="text-white text-center md:text-left px-6 md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Critique Me!
        </h1>
        <p className="text-lg md:text-2xl font-light">
          Get reviews on your portfolio and grow with feedback.
        </p>
      </div>

      {/* Right Side - Login Card */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md md:mr-10">
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
            className="w-full text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
            style={{ backgroundColor: "rgb(1, 41, 95)" }}
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleGoogleLogin}
            className="w-full text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
            style={{ backgroundColor: "rgb(1, 41, 95)" }}
          >
            Login with Google
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={handleRegister}
            className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-200"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
