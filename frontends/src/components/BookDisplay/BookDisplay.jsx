import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "./BookDisplay.css";
import { StoreContext } from '../../context/StoreContext';
import BookItem from '../BookItem/BookItem';

function BookDisplay({ category }) {
  const { book_list } = useContext(StoreContext);
  const [books, setBooks] = useState([]);
  
  // This useEffect will make an API call only when necessary
  useEffect(() => {
    const fetchBooksFromApi = async () => {
      try {
        // Call API if needed
        const response = await fetch('https://bookweb-aiuw.onrender.com/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Failed to fetch books from API:', error);
      }
    };

    if (category !== 'All') {
      // If not all categories, make API call
      fetchBooksFromApi();
    } else {
      // Otherwise, use the context book_list
      setBooks(book_list);
    }
  }, [category, book_list]);

  return (
    <div>
      <div className='food-display' id='food-display'>
        <h2>Top Books</h2>
        <div className="food-display-list">
          {books.map((item, index) => {
            if (category === 'All' || category.toLowerCase() === item.category.toLowerCase()) {
              return (
                <BookItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

// Define prop types
BookDisplay.propTypes = {
  category: PropTypes.string.isRequired,
};

export default BookDisplay;
