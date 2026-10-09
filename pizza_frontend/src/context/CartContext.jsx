import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // افزودن پیتزا به سبد خرید
    const addToCart = (pizza) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === pizza.id);

            if (existing) {
                return prev.map((item) =>
                    item.id === pizza.id
                        ? { ...item, qty: item.qty + 1 }
                        : item
                );
            }

            return [...prev, { ...pizza, qty: 1 }];
        });
    };

    // حذف پیتزا از سبد خرید (کم کردن qty یا حذف کامل)
    const removeFromCart = (id) => {
        setCart((prev) => {
            const item = prev.find((p) => p.id === id);

            // اگر فقط یک عدد مونده بود → حذف کامل
            if (item.qty === 1) {
                return prev.filter((p) => p.id !== id);
            }

            // اگر بیشتر از یک عدد بود → qty کم کن
            return prev.map((p) =>
                p.id === id ? { ...p, qty: p.qty - 1 } : p
            );
        });
    };

    // پاک کردن کل سبد خرید
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
