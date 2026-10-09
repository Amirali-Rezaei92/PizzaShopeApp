import { useCart } from "../context/CartContext";
import "./Cart.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    return (
        <div className="home">
            <Navbar />

            <div className="cart-page">

                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <h2 className="empty-cart"> empty</h2>
                ) : (
                    <div className="cart-items">
                        {cart.map((item, index) => (
                            <div key={index} className="cart-item">
                                <img src={item.image_url} alt={item.name} />

                                <div className="info">
                                    <h3>{item.name}</h3>
                                    <p>€ {item.price}</p>
                                    <p>Qty: {item.qty || 1}</p>
                                </div>

                                <button
                                    className="remove-btn"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    Remove
                                </button>

                            </div>
                        ))}
                    </div>
                )}

                {cart.length > 0 && (
                    <button className="clear-btn" onClick={clearCart}>
                        Clear Cart
                    </button>
                )}

            </div>

            <Footer />
        </div>
    );
};

export default Cart;
