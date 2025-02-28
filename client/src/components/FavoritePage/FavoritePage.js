import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FavoritePage.css';

const FavoritePage = () => {
  const [favorites, setFavorites] = useState([]);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    if (!userId) return;
    fetch(`https://home-essence-server.onrender.com/api/favorites/${userId}`)
      .then(response => response.json())
      .then(data => setFavorites(data))
      .catch(error => console.error("Error fetching favorites:", error));
  }, [userId]);

  const handleRemoveFavorite = async (productId) => {
    try {
      const response = await fetch(`https://home-essence-server.onrender.com/api/favorites/${userId}/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFavorites(favorites.filter(product => product.product_id !== productId));
        alert("Product removed from favorites.");
      } else {
        alert("Error removing product.");
      }
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  if (!userId) {
    return <div>Please <Link to="/login">login</Link> to view favorites.</div>;
  }

  return (
    <div className="favorites-container">
      <h2>Your Favorite Products</h2>
      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        <div className="favorites-list">
          {favorites.map(product => (
            <div className="favorite-card" key={product.product_id}>
              <Link to={`/view/${product.product_id}`}>
                <img src={product.product_image} alt={product.product_title} />
              </Link>
              <h3>{product.product_title}</h3>
              <p>Price: ₹{product.product_price}</p>
              <button onClick={() => handleRemoveFavorite(product.product_id)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePage;
