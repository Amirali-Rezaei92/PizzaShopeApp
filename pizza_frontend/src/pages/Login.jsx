import { useState } from "react";
import axios from "axios";
import "./Login.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:3001/login", {
                email,
                password,
            });

            const token = res.data.token;

            localStorage.setItem("token", token);

            alert("Login successful");
            setError("");
        } catch (err) {
            setError("Login failed. Please check your email and password.");
        }
    };

    return (
        <>
            <Navbar />

            <main className="login">
                <div className="login-container">
                    <h1>Login</h1>

                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            className="login-input"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="login-input"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button className="login-button" type="submit">
                            Login
                        </button>

                        {error && <p className="login-error">{error}</p>}
                    </form>
                </div>
            </main>

            <Footer />
        </>
    );
}