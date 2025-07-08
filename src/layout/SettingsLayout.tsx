import { FaImage, FaUserEdit } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const SettingsLayout = () => {
  const navItems = [
    { label: "Upload Profile Picture", path: "profilepic", icon: <FaImage /> },
    { label: "Edit Profile", path: "editprofile", icon: <FaUserEdit /> },
  ];

  return (
    <div className="flex flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-16 sm:w-1/4 bg-white">
        <ul className="flex flex-col items-center sm:items-stretch ">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-2 w-full px-6 py-3 transition-all ${
                    isActive
                      ? "bg-blue-900 bg-opacity-20 text-white font-semibold"
                      : "text-black hover:bg-blue-100"
                  }`
                }
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Panel */}
      <section className="flex-1 px-4 sm:px-6 py-0 overflow-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsLayout;
