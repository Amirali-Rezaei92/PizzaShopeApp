import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminUsers.css";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    const loadUsers = () => {
        fetch("http://localhost:3001/users", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setUsers(data));
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const updateRole = async (id, newRole) => {
        await fetch(`http://localhost:3001/users/${id}/role`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ role: newRole })
        });

        loadUsers();
    };

    const deleteUser = async (id) => {
        await fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        loadUsers();
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <h2>Manage Users</h2>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Registered</th>
                            <th>Change Role</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.created_at}</td>

                                <td>
                                    <select
                                        value={user.role}
                                        onChange={(e) => updateRole(user.id, e.target.value)}
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>

                                <td>
                                    <button onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminUsers;
