// SearchComponent.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import type { User } from "../services/AuthService";

type Props = {
  isSearchOpen?: boolean;
  onClose?: () => void;
};

const SearchComponent = ({ isSearchOpen = true, onClose }: Props) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

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
    setQuery("");
    setShowDropdown(false);
    onClose?.(); // 👈 close the search overlay
  };

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery("");
      setResults([]);
      setShowDropdown(false);
    }
  }, [isSearchOpen]);

  return (
    <div className="relative w-64 bg-white w-full">
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
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
              className="cursor-pointer px-4 py-2 hover:bg-gray-100 flex items-center gap-3"
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/api/user/${
                  user.id
                }/profile-picture`}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <div>
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500">{user.email}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
