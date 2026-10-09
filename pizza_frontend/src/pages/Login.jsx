import { useState } from "react";
import axios from "axios";
import "./Login.css";

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
        } catch (err) {
            setError("Login failed");
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br /><br />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br /><br />

                <button type="submit">Login</button>

                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
}
