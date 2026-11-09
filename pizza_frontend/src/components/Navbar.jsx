import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useCart } from "../context/CartContext";
import logo from "../assets/logo.png";
import "./Navbar.css";
import { Link } from "react-router-dom";


const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { cart } = useCart();

    return (
        <header className="navbar">

            {/* LOGO */}
            <div className="logo">
                <img src={logo} alt="Pizza Royal" />
            </div>

            {/* BURGER BUTTON */}
            <div
                className={open ? "burger open" : "burger"}
                onClick={() => setOpen(!open)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* NAV LINKS */}

            <nav className={open ? "nav open" : "nav"}>
                <Link to="/">Home</Link>
                <Link to="/pizzas">Pizzas</Link>
                <Link to="/about">About Us</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/login">Log In</Link>
            </nav>

            {/* CART ICON */}
            <Link to="/cart" className="cart-icon">
                <FiShoppingCart size={26} />
                <span className="cart-count">
                    {cart.reduce((total, item) => total + item.qty, 0)}
                </span>
            </Link>



        </header>
    );
};

export default Navbar;
