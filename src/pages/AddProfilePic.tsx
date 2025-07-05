// src/pages/ProfilePicUploadPage.tsx

import { useState } from "react";
import axios from "axios";

function AddProfilePic() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleUpload = async () => {
    const userData = localStorage.getItem("user"); // assuming you stored user info as JSON
    if (!userData) throw new Error("No user found in localStorage");

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id;
    console.log("formData", { selectedFile, userId });
    if (!selectedFile || !userId) return;

    const formData = new FormData();
    formData.append("file", selectedFile);
    console.log("selectedFile");

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
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Upload Profile Picture
      </h2>

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-32 h-32 object-cover rounded-full border mb-4"
        />
      )}

      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button
        onClick={handleUpload}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
}

export default AddProfilePic;
