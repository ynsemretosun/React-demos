import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import City from "./components/City";
import SpinnerFullPage from "./components/SpinnerFullPage";
import { CitiesProvider } from "../contexts/CitiesContext";
import { AuthProvider } from "../contexts/FakeAutContext";
import ProtectedRoute from "./pages/ProtectedRoute"; // import Product from "./pages/Product";

// import HomePage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFounds from "./pages/PageNotFound";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";

const HomePage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFounds = lazy(() => import("./pages/PageNotFound"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));

export default function App() {
  return (
    <CitiesProvider>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="product" element={<Product />} />
              <Route index element={<HomePage />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="*" element={<PageNotFounds />} />
              <Route path="login" element={<Login />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesProvider>
  );
}
