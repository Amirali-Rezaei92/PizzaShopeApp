import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3001/orders/${id}`)
            .then((res) => res.json())
            .then((data) => setOrder(data));

        fetch(`http://localhost:3001/orders/${id}/items`)
            .then((res) => res.json())
            .then((data) => setItems(data));
    }, [id]);

    if (!order) return <p>Loading...</p>;

    return (
        <div className="order-details">
            <h2>Order #{order.id}</h2>

            <p><strong>Name:</strong> {order.customer_name}</p>
            <p><strong>Email:</strong> {order.customer_email}</p>
            <p><strong>Address:</strong> {order.customer_address}</p>
            <p><strong>Total:</strong> {order.total_price} €</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Date:</strong> {order.created_at}</p>

            <h3>Items</h3>

            {items.map((item) => (
                <div key={item.id}>
                    <p>
                        {item.name} — {item.quantity} × {item.price} €
                    </p>
                </div>
            ))}
        </div>
    );
};

export default OrderDetails;
