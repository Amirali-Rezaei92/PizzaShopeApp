import { useEffect, useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import "./AdminPizzas.css";

const AdminPizzas = () => {
    const [pizzas, setPizzas] = useState([]);
    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        name: "",
        price: "",
        description: "",
        ingredients: "",
        category_id: "",
        image: null
    });

    const token = localStorage.getItem("token");

    // Load pizzas + categories
    const loadData = () => {
        fetch("http://localhost:3001/pizzas/admin/all", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setPizzas(data));

        fetch("http://localhost:3001/categories", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => res.json())
            .then((data) => setCategories(data));
    };

    useEffect(() => {
        loadData();
    }, []);

    // Add pizza WITH IMAGE
    const addPizza = async () => {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("description", form.description);
        formData.append("ingredients", form.ingredients);
        formData.append("category_id", form.category_id);
        formData.append("image", form.image);

        await fetch("http://localhost:3001/pizzas/admin/add", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });

        loadData();
    };

    // Delete pizza
    const deletePizza = async (id) => {
        await fetch(`http://localhost:3001/pizzas/admin/delete/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        });

        loadData();
    };

    return (
        <div className="admin-layout">
            <AdminSidebar />

            <div className="admin-content">
                <h2>Manage Pizzas</h2>

                <h3>Add Pizza</h3>

                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />

                <input
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <input
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                />

                <input
                    placeholder="Ingredients"
                    value={form.ingredients}
                    onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
                />

                {/* Category selector */}
                <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                >
                    <option value="">Select category</option>

                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Image upload */}
                <input
                    type="file"
                    onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
                />

                <button onClick={addPizza}>Add Pizza</button>

                <h3>Pizza List</h3>

                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {pizzas.map((pizza) => (
                            <tr key={pizza.id}>
                                <td>
                                    {pizza.image_url && (
                                        <img
                                            src={`http://localhost:3001/uploads/${pizza.image_url}`}
                                            width="80"
                                            alt="pizza"
                                        />
                                    )}
                                </td>

                                <td>{pizza.name}</td>
                                <td>{pizza.price} €</td>
                                <td>{pizza.category_id || "No category"}</td>

                                <td>
                                    <button onClick={() => deletePizza(pizza.id)}>
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

export default AdminPizzas;
