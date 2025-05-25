import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomeFeed";
import RegisterPage from "./pages/RegisterPage";
import AuthCallback from "./components/authCallback";
import PrivateRoute from "./layout/PrivateRoute";
import MainLayout from "./layout/MainLayout";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<HomePage />} />
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
