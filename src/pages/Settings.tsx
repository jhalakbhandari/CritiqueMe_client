import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSignupUser } from "../services/UserService";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSignupUser({ name, email, password });
    } catch (err) {
      alert("Changes failed");
      console.error(err);
    }
  };

  const handleHome = () => {
    navigate("/homefeed");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Settings
        </h2>
        <form onSubmit={handleSettings} className="space-y-5">
          <div>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition"
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleHome}
              className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold py-2 px-6 rounded-lg transition"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
