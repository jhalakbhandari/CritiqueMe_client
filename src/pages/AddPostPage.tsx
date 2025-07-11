import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/PostsService";
import axios from "axios";

function AddPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState("");
  const [status, setStatus] = useState("public");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/summarize`,
        { description }
      );
      setSummary(res.data.summary);
      setShowDropdown(true);
    } catch (err) {
      console.error(err);
      alert("Error summarizing the description");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSummary = () => {
    setDescription(summary);
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const post = { title, description, tags, media, status };
      await createPost(post);
      navigate("/userFeed");
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-8">
      <div className="p-6 sm:p-8 w-full max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800">
          Create New Post
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            required
            className="w-full px-4 py-2 border  focus:outline-blue-500"
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write your post description..."
            required
            className="w-full px-4 py-2 border h-28 resize-none focus:outline-blue-500"
          />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <button
              type="button"
              onClick={handleSummarize}
              className="bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Summarizing..." : "Suggest AI Summary"}
            </button>
            {showDropdown && summary && (
              <button
                type="button"
                onClick={handleSelectSummary}
                className="bg-gray-100 text-sm text-gray-700 px-4 py-2 border hover:bg-gray-200 transition"
              >
                👉 Use Suggested Summary
              </button>
            )}
          </div>

          {showDropdown && summary && (
            <div className="p-3 border bg-gray-100">
              <h4 className="font-semibold mb-1">AI Suggested Summary:</h4>
              <p className="text-sm text-gray-800">{summary}</p>
            </div>
          )}

          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-2 border  focus:outline-blue-500"
          />

          <input
            type="url"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            placeholder="Media URL (optional)"
            className="w-full px-4 py-2 border focus:outline-blue-500"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border focus:outline-blue-500"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPostPage;
