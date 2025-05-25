import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomeFeed";
import RegisterPage from "./pages/RegisterPage";
import AuthCallback from "./components/authCallback";
import PrivateRoute from "./layout/PrivateRoute";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route>
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default AppRoutes;
