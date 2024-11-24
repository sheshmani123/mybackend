import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [token, setToken] = useState("");
  const url=4000;

  // Function to add an item to the cart
  const addToCart = async (itemId) => {
    if (token) {
      try {
        await axios.post(
          "https://bookweb-aiuw.onrender.com/api/cart/add",
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

  // Load cart data when token changes
  

 

  const contextValue = {
    token,
    setToken,
    
    url// Expose the addToCart function
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
