import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CarProvider } from "./context/CarsContext";
import { CarSaleProvider } from "./context/CarsSaleContext";
import { CarRentProvider } from "./context/CarsRentContext";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CarsPage from "./pages/CarsPage";
import CarFormPage from "./pages/CarFormPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import Navbar from "./pages/Navbar";
import MyCarsPage from "./pages/MyCarsPage";
// Estos son para la venta de autos
import CarsSalePage from "./pages/CarsSale/CarsSalePage";
import MyCarsSalePage from "./pages/CarsSale/MyCarsSalePage"
import CarSalePage from "./pages/CarsSale/CarSalePage"
import CarsSaleFormPage from "./pages/CarsSale/CarsSaleFormPage"

// Estos son para el alquiler de autos
import CarsRentPage  from "./pages/CarsRent/CarsRentPage";
import MyCarsRentPage  from "./pages/CarsRent/MyCarsRentPage";
import CarRentPage  from "./pages/CarsRent/CarRentPage";
import CarsRentFormPage  from "./pages/CarsRent/CarsRentFormPage";

//Estas son para los locales
import OfficesPage from "./pages/Office/OfficesPage";
import MyOfficesPage from "./pages/Office/MyOfficesPage";
import OfficePage from "./pages/Office/OfficePage";
import OfficeFormPage  from "./pages/Office/OfficeFormPage";



function App() {

  return (
    <AuthProvider>
      <CarProvider>
        <CarSaleProvider>
          <CarRentProvider>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route element={<ProtectedRoute />}>

                  <Route path="/cars" element={<CarsPage />} />
                  <Route path="/my-cars" element={<MyCarsPage />} />
                  <Route path="/add-car" element={<CarFormPage />} />
                  <Route path="/cars/:id" element={<CarFormPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  
                  <Route path="/see-cars-sale/:id" element={< CarSalePage />} />
                  <Route path="/cars-sale" element={<CarsSalePage />} />
                  <Route path="/my-cars-sale" element={< MyCarsSalePage />} /> 
                  <Route path="/add-car-sale" element={<CarsSaleFormPage />} />
                  <Route path="/cars-sale/:id" element={<CarsSaleFormPage />} />

                  <Route path="/see-cars-rent/:id" element={< CarRentPage />} />
                  <Route path="/cars-rent" element={<CarsRentPage />} />
                  <Route path="/my-cars-rent" element={<MyCarsRentPage />} />
                  <Route path="/add-car-rent" element={<CarsRentFormPage />} />
                  <Route path="/cars-rent/:id" element={<CarsRentFormPage />} />

                  <Route path="/see-office/:id" element={< OfficePage />} />
                  <Route path="/offices" element={<OfficesPage />} />
                  <Route path="/my-offices" element={<MyOfficesPage />} />
                  <Route path="/add-office" element={<OfficeFormPage />} />
                  <Route path="/offices/:id" element={<OfficeFormPage />} />

                </Route>
              </Routes>
            </BrowserRouter>
          </CarRentProvider>
        </CarSaleProvider>
      </CarProvider>
    </AuthProvider>
  );
}
export default App
    