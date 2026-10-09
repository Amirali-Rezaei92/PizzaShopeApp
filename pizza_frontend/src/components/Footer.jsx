import { useState } from "react";
import "./Footer.css";

const Footer = () => {
    const [open, setOpen] = useState(false);

    return (
        <footer className="footer">
            <p>© 2026 Pizza Royal — Made with AMIRALI in Milan</p>

        </footer>

    );
};
export default Footer;