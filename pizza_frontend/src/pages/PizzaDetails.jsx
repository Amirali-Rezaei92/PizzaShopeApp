import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PizzaDetails.css";
import { CartContext } from "../context/CartContext";
import Navbar from "../components/Navbar";
const PizzaDetails = () => {
    const { id } = useParams();
    const [pizza, setPizza] = useState(null);
    const [error, setError] = useState(null);

    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        fetch(`http://localhost:3001/pizzas/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Pizza not found");
                return res.json();
            })
            .then((data) => setPizza(data))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) return <p className="error">{error}</p>;
    if (!pizza) return <p className="loading">Loading...</p>;

    return (
        <div className="pizza-details">
            <Navbar />
            <div className="details-image-box">
                <img src={pizza.image_url} className="pizza-details-image" alt={pizza.name} />
            </div>

            <h2 className="details-title">{pizza.name}</h2>

            <p className="details-price">{pizza.price} €</p>

            <p className="details-category">
                Category: <span>{pizza.category_name || "No category"}</span>
            </p>

            {pizza.description && (
                <p className="details-description">{pizza.description}</p>
            )}

            {pizza.ingredients && (
                <p className="details-ingredients">
                    <strong>Ingredients:</strong> {pizza.ingredients}
                </p>
            )}

            <button
                className="btn-primary"
                onClick={() => addToCart(pizza)}
            >
                Add to Cart
            </button>

        </div>
    );
};

export default PizzaDetails;
