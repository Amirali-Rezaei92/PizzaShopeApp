import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminCategories.css";

const AdminCategories = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);

    const token = localStorage.getItem("token");

    const loadCategories = () => {
        fetch("http://localhost:3001/categories", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const addCategory = async () => {
        await fetch("http://localhost:3001/categories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        setName("");
        loadCategories();
    };

    const updateCategory = async (id) => {
        await fetch(`http://localhost:3001/categories/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ name })
        });

        setName("");
        setEditId(null);
        loadCategories();
    };

    const deleteCategory = async (id) => {
        await fetch(`http://localhost:3001/categories/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        loadCategories();
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <h2>Manage Categories</h2>

                <h3>{editId ? "Edit Category" : "Add Category"}</h3>

                <input
                    placeholder="Category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                {editId ? (
                    <button onClick={() => updateCategory(editId)}>Update Category</button>
                ) : (
                    <button onClick={addCategory}>Add Category</button>
                )}

                <h3>Category List</h3>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id}>
                                <td>{cat.id}</td>
                                <td>{cat.name}</td>

                                <td>
                                    <button
                                        onClick={() => {
                                            setEditId(cat.id);
                                            setName(cat.name);
                                        }}
                                    >
                                        Edit
                                    </button>
                                </td>

                                <td>
                                    <button onClick={() => deleteCategory(cat.id)}>
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

export default AdminCategories;
