import { NavLink, Outlet } from "react-router-dom";

const SettingsLayout = () => {
  const navItems = [
    { label: "Upload Profile Picture", path: "profilepic" },
    { label: "Edit Profile", path: "editprofile" },
  ];

  return (
    <div className="flex min-h-[80vh]">
      {/* Sidebar */}
      <aside className="w-1/4 rounded-md shadow-md">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block p-3 rounded cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-900 text-white font-semibold"
                      : "bg-white hover:bg-blue-100 text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>

      {/* Content Panel */}
      <section className="flex-1 bg-white p-6 rounded-md shadow-md">
        <Outlet />
      </section>
    </div>
  );
};

export default SettingsLayout;
