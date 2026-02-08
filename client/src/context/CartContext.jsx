import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Load cart from localStorage if available, else empty array
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // 1. ADD TO CART
    const addToCart = (product, quantity = 1) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find((item) => item.id === product.id);
            if (existingItem) {
                // If item exists, just increase quantity
                return prevCart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            } else {
                // If new item, add to list
                return [...prevCart, { ...product, quantity }];
            }
        });
        // Optional: You can add a toast notification here
        alert(`${quantity} x ${product.name} added to cart!`);
    };

    // 2. REMOVE FROM CART
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    // 3. UPDATE QUANTITY
    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return; // Prevent going below 1
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    // 4. CLEAR CART
    const clearCart = () => {
        setCart([]);
    };

    // Derived State: Total Price
    const cartTotal = cart.reduce((total, item) => {
        // Remove currency symbol and commas to calculate (e.g., "₹1,500" -> 1500)
        const price = Number(item.price.replace(/[^0-9.-]+/g, "")); 
        return total + price * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);