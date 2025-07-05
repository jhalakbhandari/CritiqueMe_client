import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../services/PostsService";

function AddPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState("");
  const [status, setStatus] = useState("public");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      //call the API
      const posts = {
        title,
        description,
        tags,
        media,
        status,
      };
      console.log(posts);
      createPost(posts);
      //   alert("Post created successfully");
      navigate("/homefeed");
    } catch (error) {
      console.error("Post creation failed:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create New Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Post Title"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Tags (comma separated)"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            type="url"
            value={media}
            onChange={(e) => setMedia(e.target.value)}
            placeholder="Media URL"
            required
            className="w-full px-4 py-2 border rounded-lg"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddPostPage;
