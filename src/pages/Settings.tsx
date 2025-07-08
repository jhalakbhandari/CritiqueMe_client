import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import { handleSignupUser } from "../services/UserService";

function Settings() {
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const getRandomColor = () => {
    const colors = [
      "#FFB6C1",
      "#FFD700",
      "#90EE90",
      "#87CEFA",
      "#D8BFD8",
      "#FFA07A",
      "#20B2AA",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const [randomBg] = useState(getRandomColor());

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) return;
    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id;
    if (!userId) return;

    setProfilePicUrl(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/user/${userId}/profile-picture?t=${Date.now()}`
    );

    setName(parsedUser.name || "");
    setEmail(parsedUser.email || "");
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    const userData = localStorage.getItem("user");
    if (!userData || !selectedFile) return;

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/${userId}/profile-picture`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Profile picture updated!");
      setProfilePicUrl(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/user/${userId}/profile-picture?t=${Date.now()}`
      );
      setPreview("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  const handleSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSignupUser({ name, email, password });
      alert("Profile info updated!");
    } catch (err) {
      alert("Failed to update profile info.");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto bg-white">
      <div className="w-full max-w-2xl mx-auto px-4 py-6 sm:py-10">
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Edit Profile
          </h1>
          <p className="text-sm text-gray-500">
            Update your profile picture and details.
          </p>
        </div>

        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-3 mb-10">
          <div
            className="w-32 h-32 rounded-full border flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
            style={{
              backgroundColor:
                preview || profilePicUrl ? "transparent" : randomBg,
            }}
          >
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : profilePicUrl ? (
              <img
                src={profilePicUrl}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <FaUser className="text-5xl text-white" />
            )}
          </div>

          <label className="cursor-pointer bg-blue-100 text-blue-800 px-4 py-2 rounded font-medium hover:bg-blue-200 transition">
            Choose File
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </label>

          {selectedFile && (
            <p className="text-sm text-gray-700">
              Selected: {selectedFile.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
          >
            Upload Picture
          </button>
        </div>

        {/* Profile Info Form */}
        <form onSubmit={handleSettings} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
            <button
              type="submit"
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
            >
              Save Changes
            </button>

            <button
              type="button"
              onClick={() => navigate("/homefeed")}
              className="w-full sm:w-auto border border-blue-600 text-blue-600 hover:bg-blue-100 font-semibold py-2 px-6 rounded-lg transition"
            >
              Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
