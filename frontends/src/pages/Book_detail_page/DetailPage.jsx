import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import './DetailPage.css';
import { assets } from '../../assets/assets';
import { FilledHeartSvg, HeartSvg, LoaderSvg, UnfilledHeartIcon } from '../../components/Helpers/Svg';

const DetailPage = () => {
  const { book_list, cartItem, addToCart, removeCart, addToWishlist, removeFromWishlist } = useContext(StoreContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [bookItem, setBookItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      const parsedWishlist = JSON.parse(storedWishlist);
      if (parsedWishlist.includes(id)) {
        setIsClicked(true);
      }
    }
  }, [id]);

  useEffect(() => {
    const item = book_list.find(item => item._id === id);
    if (item) {
      setBookItem(item);
    }
  }, [id, book_list]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
    if (!isClicked) {
      addToWishlist(id);
    } else {
      removeFromWishlist(id);
    }
  };

  const handleBuyClick = () => {
    addToCart(id);
    navigate('/cart');
  };

  if (isLoading || !bookItem) {
    return <LoaderSvg />;
  }

  return (
    <div className="detail-page-container">
      <div className="card-container">
        <img src={`http://localhost:4000/images/${bookItem.image}`} alt={bookItem.name} className="card-image" />
        <div className="heart-container" onClick={handleClick}>
          {isClicked ? <FilledHeartSvg /> : <UnfilledHeartIcon />}
        </div>
        {!cartItem[id] ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to Cart"
          />
        ) : (
          <div className="book-item-counter">
            <img
              onClick={() => removeCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from Cart"
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
            <p>{cartItem[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add to Cart"
              style={{ width: '30px', height: '30px', cursor: 'pointer' }}
            />
          </div>
        )}
        <button className="buy-button" onClick={handleBuyClick}>
          Buy
        </button>
      </div>
      <div className="detail-content">
        <p className="book-name">
          <span>This Book is Written By:</span>
          <br />
          <span className="book-name-actual">{bookItem.name}</span>
        </p>
        <p className="about">About:</p>
        <p className="book-description">~ {bookItem.description}</p><br/>
        <div className="price-card">
          <p>Price: ${bookItem.price}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
