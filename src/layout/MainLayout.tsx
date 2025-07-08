import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-0  ">
        <Outlet /> {/* This renders the nested page content */}
      </main>
    </div>
  );
};

export default MainLayout;
