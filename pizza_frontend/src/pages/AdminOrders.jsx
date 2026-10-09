import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminOrders.css";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);

    const token = localStorage.getItem("token");

    const loadOrders = () => {
        fetch("http://localhost:3001/orders", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setOrders(data));
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const loadItems = (orderId) => {
        fetch(`http://localhost:3001/orders/${orderId}/items`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setItems(data));
    };

    const updateStatus = async (orderId, newStatus) => {
        await fetch(`http://localhost:3001/orders/${orderId}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: newStatus }),
        });

        loadOrders();
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <h2>All Orders</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Customer</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Total</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Items</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer_name}</td>
                                <td>{order.customer_email}</td>
                                <td>{order.customer_address}</td>
                                <td>{order.total_price} €</td>
                                <td>{order.created_at}</td>

                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => updateStatus(order.id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Preparing">Preparing</option>
                                        <option value="On the way">On the way</option>
                                        <option value="Delivered">Delivered</option>
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => loadItems(order.id)}>
                                        View Items
                                    </button>
                                </td>

                                <td>
                                    <Link to={`/admin/orders/${order.id}`}>
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h3>Order Items</h3>

                {items.length === 0 && <p>No items loaded.</p>}

                {items.map((item) => (
                    <div key={item.id}>
                        <p>
                            {item.name} — {item.quantity} × {item.price} €
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrders;
