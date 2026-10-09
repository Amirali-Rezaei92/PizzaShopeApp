import { useEffect, useState } from "react";
import PizzaCard from "../components/PizzaCard";
import Navbar from "../components/Navbar";

import "./Pizzas.css";
import Footer from "../components/Footer";

const Pizzas = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/pizzas")
            .then((res) => res.json())
            .then((data) => setPizzas(data));
    }, []);

    return (
        <div >
            <Navbar />
            <div className="pizzas-page">
                <h2 className="title">All Pizzas</h2>

                <div className="pizzas-flex">
                    {pizzas.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Pizzas;
