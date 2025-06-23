// frontend/src/routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Products from "../pages/Products";
import Detail from "../pages/Detail"; // Perlu diimplementasikan
import Cart from "../pages/Cart";     // Perlu diimplementasikan
import NotFound from "../pages/NotFound"; // Perlu diimplementasikan
import Checkout from "../pages/Checkout"; // Perlu diimplementasikan
import Login from "../pages/Login";
import Register from "../pages/Register";
import Orders from "../pages/Orders";   // Perlu diimplementasikan
import Invoice from "../pages/Invoice"; // Perlu diimplementasikan
import GoogleRedirect from "../pages/GoogleRedirect";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/detail/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/google-success" element={<GoogleRedirect />} />
      
      {/* Rute yang dilindungi */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <Orders />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invoice/:id"
        element={
          <ProtectedRoute>
            <Invoice />
          </ProtectedRoute>
        }
      />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;