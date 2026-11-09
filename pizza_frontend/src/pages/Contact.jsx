import "./Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Contact = () => {
    return (
        <>
            <Navbar />

            <main className="contact">
                <div className="contact-container">
                    <h1>Contact Us</h1>

                    <p className="contact-text">
                        We'd love to hear from you! Whether you have a question about our
                        menu, delivery service, or special offers, feel free to get in
                        touch with us.
                    </p>

                    <div className="contact-info">
                        <div className="contact-card">
                            <h2>📍 Address</h2>
                            <p>Via Roma 123, Milan, Italy</p>
                        </div>

                        <div className="contact-card">
                            <h2>📞 Phone</h2>
                            <p>+39 02 1234 5678</p>
                        </div>

                        <div className="contact-card">
                            <h2>📧 Email</h2>
                            <p>info@pizzaroyal.com</p>
                        </div>

                        <div className="contact-card">
                            <h2>🕒 Opening Hours</h2>
                            <p>Mon - Sun:  <br />11:00 AM - 11:00 PM</p>
                        </div>
                    </div>

                    <div className="contact-form">
                        <h2>Send Us a Message</h2>

                        <form>
                            <input type="text" placeholder="Your Name" />
                            <input type="email" placeholder="Your Email" />
                            <textarea
                                rows="6"
                                placeholder="Write your message here..."
                            ></textarea>

                            <button type="submit">Send Message</button>
                        </form>
                    </div>
                </div>
            </main>

            <Footer />
        </>
    );
};

export default Contact;