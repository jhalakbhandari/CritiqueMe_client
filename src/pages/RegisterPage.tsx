import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignupUser } from "../services/UserService";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSignupUser({ name, email, password });
      // console.log("Login response:", res);
      alert("Registered successfully");
      navigate("/homefeed");
    } catch (err) {
      alert("Registration failed");
      console.error(err);
    }
  };

  const handleLogin = () => {
    window.location.href = "http://localhost:5173/login";
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

      {/* Right Side - Register Card */}
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md md:mr-10">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
            style={{ backgroundColor: "rgb(1, 41, 95)" }}
          >
            Register
          </button>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
            style={{ backgroundColor: "rgb(1, 41, 95)" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
