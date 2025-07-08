import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";

function AddProfilePic() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [profilePicUrl, setProfilePicUrl] = useState<string | null>(null);

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

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
  }, []);

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
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      alert("Uploaded successfully!");
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

  return (
    <div className="w-full max-w-md mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
          Update Your Profile Picture
        </h2>
        <p className="text-sm text-gray-500">
          Your picture helps personalize your profile.
        </p>
      </div>

      <div
        className="w-32 h-32 rounded-full border mb-4 mx-auto flex items-center justify-center text-white text-4xl font-bold overflow-hidden"
        style={{
          backgroundColor: preview || profilePicUrl ? "transparent" : randomBg,
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

      <div className="flex flex-col items-center gap-2">
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
          <p className="text-sm text-gray-700">Selected: {selectedFile.name}</p>
        )}

        <button
          onClick={handleUpload}
          className="mt-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default AddProfilePic;
