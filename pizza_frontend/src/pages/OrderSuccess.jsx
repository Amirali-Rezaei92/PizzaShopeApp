import { useLocation } from "react-router-dom";

const OrderSuccess = () => {
    const location = useLocation();
    const orderId = location.state?.orderId;

    return (
        <div className="order-success">
            <h2>Order Successful</h2>

            {orderId ? (
                <p>Your order number is: <strong>{orderId}</strong></p>
            ) : (
                <p>Order completed.</p>
            )}

            <p>Thank you for your purchase!</p>
        </div>
    );
};

export default OrderSuccess;
