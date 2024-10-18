import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState("");
  const url = "http://localhost:4000"; 
  const [book_list, setBookList] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  const addToCart = async (itemId) => {
    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(
          "Error adding to cart:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const removeCart = async (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      try {
        await axios.post(
          url + "/api/cart/remove",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(
          "Error removing from cart:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = book_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItem[item];
      }
    }
    return totalAmount;
  };

  useEffect(() => {
    async function loadData() {
      await fetchBookList();

      if (localStorage.getItem("token")) {
        console.log("Stored token found:", localStorage.getItem("token"));

        setToken(localStorage.getItem("token"));

        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  useEffect(() => {
    if (token) {
      console.log("Token set, loading cart data:", token); // Debugging line
      loadCartData(token);
    }
  }, [token]);

  const fetchBookList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setBookList(response.data.data);
      console.log("this is my bookList", response.data.data);
    } catch (error) {
      console.error(
        "Error fetching book list:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const loadCartData = async (token) => {
    try {
      const response = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response && response.data && response.data.cartData) {
        setCartItem(response.data.cartData);
      }
    } catch (error) {
      console.error(
        "Error loading cart data:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      setWishlist(parsedWishlist);
    }
  }, []);

  const addToWishlist = (id) => {
    const updatedWishlist = [...wishlist, id];
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((itemId) => itemId !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const contextValue = {
    book_list,
    addToCart,
    removeCart,
    cartItem,
    setCartItem,
    getTotalCartAmount,
    url,
    token,
    setToken,
    removeFromWishlist,
    addToWishlist,
    wishlist,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
