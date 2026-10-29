import { useCart } from "../context/CartContext";
import "./Cart.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();

    // محاسبه تعداد کل پیتزاها
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    // محاسبه قیمت کل
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
        <div className="home">
            <Navbar />

            <div className="cart-page">

                <h2>Your Cart</h2>

                {cart.length === 0 ? (
                    <h2 className="empty-cart">Your cart is empty</h2>
                ) : (
                    <>
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <img src={item.image_url} alt={item.name} />

                                    <div className="info">
                                        <h3>{item.name}</h3>
                                        <p>€ {item.price}</p>
                                        <p>Qty: {item.qty}</p>
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

                        {/* بخش پرداخت */}
                        <div className="cart-summary">
                            <p>Total Items: <strong>{totalItems}</strong></p>
                            <p>Total Price: <strong>€ {totalPrice.toFixed(2)}</strong></p>
                            <div className="btns">
                                <Link to="/checkout" className="checkout-btn">
                                    Proceed to Checkout
                                </Link>

                                <button className="clear-btn" onClick={clearCart}>
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </>
                )}

            </div>

            <Footer />
        </div>
    );
};

export default Cart;
