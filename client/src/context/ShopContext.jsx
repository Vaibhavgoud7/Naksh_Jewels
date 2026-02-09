import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {

    const currency = "₹";
    const delivery_fee = 100;
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [cartItems, setCartItems] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const getProductsData = async () => {
        try {
            const response = await api.get('/product/list');
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log("Product Fetch Error:", error);
        }
    };

    // --- DEBUGGED CHECKUSER FUNCTION ---
    const checkUser = async () => {
        try {
            console.log("Checking User Authentication..."); // DEBUG LOG
            const response = await api.get('/user/profile');
            console.log("Profile Response:", response.data); // DEBUG LOG

            if (response.data.success) {
                setIsAuthenticated(true);
                setUser(response.data.user);
                getUserCart(); 
            } else {
                console.log("Profile Check Failed:", response.data.message); // DEBUG LOG
                setIsAuthenticated(false);
                setUser(null);
            }
        } catch (error) {
            console.error("Profile Check Error (CATCH):", error); // DEBUG LOG
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const getUserCart = async () => {
        try {
            const response = await api.post('/cart/get', {});
            if (response.data.success) {
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (isAuthenticated) {
            try {
                await api.post('/cart/add', { itemId, size });
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (isAuthenticated) {
            try {
                await api.post('/cart/update', { itemId, size, quantity });
            } catch (error) {
                console.log(error);
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0 && itemInfo) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };

    useEffect(() => {
        getProductsData();
        checkUser(); 
    }, []);

    const value = {
        products, currency, delivery_fee,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity, getCartAmount,
        navigate, 
        isAuthenticated, setIsAuthenticated, checkUser, user
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;