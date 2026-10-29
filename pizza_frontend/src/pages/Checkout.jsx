import { useState, useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useContext(CartContext);

    // اگر سبد خالی بود → اجازه ورود به Checkout نده
    useEffect(() => {
        if (cart.length === 0) {
            navigate("/cart");
        }
    }, [cart, navigate]);

    const totalPrice = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const [form, setForm] = useState({
        name: "",
        email: "",
        address: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await fetch("http://localhost:3001/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    cart,
                    totalPrice,
                }),
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const data = await response.json();

            // پاک کردن سبد خرید بعد از سفارش
            clearCart();

            navigate("/order-success", {
                state: { orderId: data.orderId },
            });

        } catch (err) {
            setError("Something went wrong. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="home">
            <Navbar/>


            <div className="checkout-page">
                <h2>Checkout</h2>

                <form onSubmit={handleSubmit} className="checkout-form">

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

                    {error && <p className="error">{error}</p>}

                    <button type="submit" disabled={loading}>
                        {loading ? "Processing..." : "Place Order"}
                    </button>
                </form>

                <h3>Total: € {totalPrice.toFixed(2)}</h3>
            </div>
            <Footer />
        </div>
    );
};

export default Checkout;
