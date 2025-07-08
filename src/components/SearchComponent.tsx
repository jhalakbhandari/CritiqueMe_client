import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../services/AuthService";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  // console.log("🔍 SearchUsers component mounted");

  useEffect(() => {
    const fetchUsers = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        return;
      }

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/user/search?q=${query}`
        );
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Search failed:", err);
        setResults([]);
      }
    };

    const debounce = setTimeout(fetchUsers, 300);
    return () => clearTimeout(debounce);
  }, [query]);

  const handleClickUser = (id: string) => {
    navigate(`/profile/${id}`);
    setShowDropdown(false);
    setQuery("");
  };

  return (
    <div className="relative w-64 bg-white w-full">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // console.log("✏️ Query changed:", e.target.value);

          setShowDropdown(true);
        }}
        className="w-full px-4 py-2 rounded border"
      />
      {showDropdown && results.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow">
          {results.map((user) => (
            <div
              key={user.id}
              onClick={() => handleClickUser(user.id)}
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
            >
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-gray-500">{user.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
