import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OrderSuccess from "./pages/OrderSuccess";
import AdminOrders from "./pages/AdminOrders";
import OrderDetails from "./pages/OrderDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPizzas from "./pages/AdminPizzas";
import AdminUsers from "./pages/AdminUsers";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import PizzaDetails from "./pages/PizzaDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Pizzas from "./pages/Pizzas";




function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/pizzas" element={<Pizzas />} />

        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute>
              <AdminOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/orders/:id"
          element={
            <ProtectedRoute>
              <OrderDetails />
            </ProtectedRoute>
          }
        />


        <Route
          path="/admin/pizzas"
          element={
            <ProtectedRoute>
              <AdminPizzas />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categories"
          element={
            <ProtectedRoute>
              <AdminCategories />
            </ProtectedRoute>
          }
        />

        <Route path="/pizzas/:id" element={<PizzaDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/checkout" element={<Checkout />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
