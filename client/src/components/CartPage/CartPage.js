import React, { useEffect, useState } from 'react';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart items for the logged-in user on component mount
  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    if (!userId) {
      setLoading(false);
      return;
    }
    fetch(`https://home-essence-server.onrender.com/api/cart?user_id=${userId}`)
      .then(response => response.json())
      .then(data => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      });
  }, []);

  // Function to remove an item from the cart
  const handleRemoveCartItem = (itemId) => {
    fetch(`https://home-essence-server.onrender.com/api/cart/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Update the cart items state by filtering out the removed item
        setCartItems(cartItems.filter(item => item.id !== itemId));
        alert('Item removed from cart!');
      })
      .catch(error => {
        console.error("Error removing cart item:", error);
        alert("Error removing cart item.");
      });
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <p>Product ID: {item.product_id}</p>
              <p>Quantity: {item.quantity}</p>
              {/* Remove button for each cart item */}
              <button onClick={() => handleRemoveCartItem(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
