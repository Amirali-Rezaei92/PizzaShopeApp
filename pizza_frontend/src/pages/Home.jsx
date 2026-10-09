import { useEffect, useState } from "react";
import "./Home.css";
import logo from "../assets/logo.png";
import hero from "../assets/hero.jpeg";
import PizzaCard from "../components/PizzaCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
    const [pizzas, setPizzas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/pizzas")
            .then((res) => res.json())
            .then((data) => setPizzas(data));
    }, []);

    const popular = pizzas.slice(0, 4);
    const vegetarian = pizzas.filter((p) =>
        p.description.toLowerCase().includes("veg")
    );


    return (
        <div className="home">

            {/* NAVBAR */}
            <Navbar />
            v

            {/* HERO */}
            <section className="hero">

                <div>
                    <img src={hero} alt="" />
                </div>
            </section>

            {/* MOST POPULAR */}
            <section className="section">
                <h2 className="section-title">Most Popular</h2>

                <div className="popular-flex">
                    {popular.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))}
                </div>
            </section>


            {/* VEGETARIAN */}
            <section className="section">
                <h2 className="section-title">Vegetarian</h2>

                <div className="veg-flex">
                    {vegetarian.map((pizza) => (
                        <PizzaCard key={pizza.id} pizza={pizza} />
                    ))}
                </div>
            </section>



            {/* FOOTER */}
            <Footer />
        </div>
    );
};

export default Home;
