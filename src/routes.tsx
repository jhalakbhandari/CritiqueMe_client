import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomeFeed";
import RegisterPage from "./pages/RegisterPage";
import AuthCallback from "./components/authCallback";
import PrivateRoute from "./layout/PrivateRoute";
import MainLayout from "./layout/MainLayout";
import UserFeed from "./pages/UserFeed";
import Settings from "./pages/Settings";
import RedirectOnRoot from "./components/RedirectOnRoot";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectOnRoot />} />

        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        
        {/* Authentication check */}
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/homefeed" element={<HomePage />} />
          <Route path="/userfeed" element={<UserFeed />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more private routes here */}
          {/* Example: */}

          {/* <Route path="/profile" element={<UserProfile />} />
          <Route path="/add-project" element={<AddProject />} /> */}
        </Route>
        <Route>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
