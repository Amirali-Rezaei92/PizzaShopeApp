import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./PizzaCard.css";

const PizzaCard = ({ pizza }) => {
    const { addToCart } = useCart();

    return (
        <div className="pizza-card">

            <Link to={`/pizzas/${pizza.id}`}>
                <img src={pizza.image_url} className="pizza-img" alt={pizza.name} />
            </Link>

            <h3>{pizza.name}</h3>
            <p>{pizza.description}</p>
            <h4>€ {pizza.price}</h4>
            <button onClick={() => addToCart(pizza)}>
                Add to Cart
            </button>
            <Link to={`/pizzas/${pizza.id}`}>
                <p>Details</p>
            </Link>

        </div>
    );
};

export default PizzaCard;
