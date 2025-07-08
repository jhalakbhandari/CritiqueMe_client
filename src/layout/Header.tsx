import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/AuthService";
import SearchComponent from "../components/SearchComponent";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState<string>("");

  const navigate = useNavigate();

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) throw new Error("No user found in localStorage");

    const parsedUser = JSON.parse(userData);
    const userId = parsedUser.id || {};
    if (!userId) return;

    setProfilePicUrl(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/user/${userId}/profile-picture?t=${Date.now()}`
    );
  }, []);

  return (
    <div>
      <nav
        className="bg-white shadow"
        style={{ backgroundColor: "rgb(1, 41, 95)" }}
      >
        <div className="px-4 sm:px-8 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/"
                className="flex-shrink-0 text-white text-lg sm:text-2xl font-bold"
              >
                Critique Me
              </Link>
            </div>
            <div className="hidden md:block w-64">
              <SearchComponent />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSearch}
                className="text-white md:hidden"
                aria-label="Search"
              >
                <FaSearch className="w-5 h-5" />
              </button>
              <div className="hidden md:block relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white hover:bg-gray-50 focus:outline-none"
                  id="options-menu"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <img
                    src={profilePicUrl || "/default-profile.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                </button>
              </div>
              <div className="md:hidden">
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <svg
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="w-6 h-6"
                    viewBox="0 0 1792 1792"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-4 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
            <div className="py-1" role="menu" aria-orientation="vertical">
              <Link
                to="/userfeed"
                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                My Profile
              </Link>
              <Link
                to="/settings"
                className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-md text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>

      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-white/1 backdrop-blur-sm backdrop-saturate-150 overflow-auto">
          <div className="w-full max-w-lg mt-6 p-4">
            <div className="flex items-center gap-4 mb-4">
              <SearchComponent
                isSearchOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
              />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="text-black hover:text-gray-800 text-2xl font-bold"
                aria-label="Close search"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
