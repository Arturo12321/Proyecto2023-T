import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarsContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CarsPage from "./pages/CarsPage";
import CarFormPage from "./pages/CarFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./pages/Navbar";

function App() {

  return (
    <AuthProvider>
      <CarProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/cars" element={<CarsPage />} />
              <Route path="/add-car" element={<CarFormPage />} />
              <Route path="/cars/:id" element={<CarFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CarProvider>
    </AuthProvider>
  );
}
export default App
    