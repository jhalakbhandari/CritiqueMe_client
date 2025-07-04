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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Register
            </button>
            <button
              type="button"
              onClick={handleLogin}
              className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold py-2 px-6 rounded-lg transition"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
