import { Link, useLocation } from "react-router-dom";
import "../pages/AdminSidebar.css";

const AdminSidebar = () => {
    const { pathname } = useLocation();

    const isActive = (path) => pathname === path ? "active" : "";

    return (
        <div className="admin-sidebar">
            <h2 className="admin-title">Admin Panel</h2>

            <nav>
                <Link className={isActive("/admin/dashboard")} to="/admin/dashboard">Dashboard</Link>
                <Link className={isActive("/admin/pizzas")} to="/admin/pizzas">Pizzas</Link>
                <Link className={isActive("/admin/categories")} to="/admin/categories">Categories</Link>
                <Link className={isActive("/admin/orders")} to="/admin/orders">Orders</Link>
                <Link className={isActive("/admin/users")} to="/admin/users">Users</Link>
            </nav>
        </div>
    );
};

export default AdminSidebar;
