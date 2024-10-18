import React, { useContext } from "react";
import "./Wish.css";
import { StoreContext } from "../../context/StoreContext";

const Wish = () => {
  const { wishlist, book_list, url } = useContext(StoreContext);

  return (
    <div className="heading">
      <h1>This is my wishlist rendering</h1>
      <div className="wishlist-items">
        {wishlist.map((itemId) => {
          const item = book_list.find((foodItem) => foodItem._id === itemId); // Find the corresponding item in food_list
          console.log("this is my all the matched item", item);
          if (item) {
            return (
              <div key={item.id} className="wishlist-item">
                <img
                  src={`${url}/images/${item.image}`}
                  alt=""
                  className="food-item-image"
                />

                <div>
                  <h3>{item.name}</h3>
                  <p>~{item.description}</p>
                  <div className="price-container">
                    <p className="price">Price:${item.price}</p>
                  </div>
                </div>
              </div>
            );
          }
          return null; // If item is not found, don't render anything
        })}
      </div>
    </div>
  );
};

export default Wish;
