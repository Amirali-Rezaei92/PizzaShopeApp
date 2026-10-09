import { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart } = useContext(CartContext);

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:3001/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...form,
                cart,
                totalPrice,
            }),
        });

        const data = await response.json();

        navigate("/order-success", {
            state: { orderId: data.orderId }
        });
    };

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <input
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Place Order</button>
            </form>

            <h3>Total: {totalPrice.toFixed(2)} €</h3>
        </div>
    );
};

export default Checkout;
