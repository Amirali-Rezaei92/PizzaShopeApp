import "./About.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
    return (
        <>
            <Navbar />

            <main className="about">
                <div className="about-container">
                    <h1>About Pizza Royal</h1>

                    <p>
                        At Pizza Royal, we believe that great pizza starts with quality
                        ingredients, traditional recipes, and a passion for exceptional
                        taste.
                    </p>

                    <p>
                        Since day one, our goal has been simple: serve fresh, handcrafted
                        pizzas that bring friends and families together around the table.
                    </p>

                    <p>
                        Every pizza is prepared with carefully selected ingredients, baked
                        to perfection, and delivered with the same attention to quality
                        that defines our restaurant.
                    </p>

                    <h2>Why Choose Us?</h2>

                    <ul>
                        <li>🍕 Fresh ingredients prepared daily</li>
                        <li>🔥 Authentic stone-baked flavor</li>
                        <li>🚚 Fast and reliable delivery service</li>
                        <li>⭐ Outstanding customer experience</li>
                    </ul>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default About;