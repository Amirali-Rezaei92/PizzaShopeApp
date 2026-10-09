import { useEffect, useState } from "react";

const AdminDashboard = () => {
    const token = localStorage.getItem("token");

    const [ordersCount, setOrdersCount] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [revenueToday, setRevenueToday] = useState(0);
    const [revenueMonth, setRevenueMonth] = useState(0);
    const [salesWeek, setSalesWeek] = useState([]);

    useEffect(() => {
        // Orders count
        fetch("http://localhost:3001/stats/orders-count", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setOrdersCount(data.orders));

        // Users count
        fetch("http://localhost:3001/stats/users-count", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setUsersCount(data.users));

        // Revenue today
        fetch("http://localhost:3001/stats/revenue-today", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setRevenueToday(data.revenue_today || 0));

        // Revenue month
        fetch("http://localhost:3001/stats/revenue-month", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setRevenueMonth(data.revenue_month || 0));

        // Sales week
        fetch("http://localhost:3001/stats/sales-week", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setSalesWeek(data));
    }, []);

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>

            <div className="stats-cards">
                <div className="card">Total Orders: {ordersCount}</div>
                <div className="card">Total Users: {usersCount}</div>
                <div className="card">Revenue Today: {revenueToday} €</div>
                <div className="card">Revenue This Month: {revenueMonth} €</div>
            </div>

            <h3>Sales (Last 7 Days)</h3>

            <ul>
                {salesWeek.map((day) => (
                    <li key={day.day}>
                        {day.day}: {day.revenue} €
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
