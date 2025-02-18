"use client";

import { useState } from 'react';
import Header from '../../components/Header/Header';
import products from '../../data/products'; 
import './page.css';

export default function productPage({ params }) {
  const [cartItems, setCartItems] = useState([]);
  const { id } = params;
  const product = products.find((product) => product.id === parseInt(id));

  if (!product) {
    return <p>product not found!</p>;
  }

  const { title, location, price, room, images, additionalImages, bedRoom, kitchen } = product;

  const [showAdditionalImages, setShowAdditionalImages] = useState(false);

  const toggleImages = () => {
    setShowAdditionalImages((prev) => !prev);
  };

  return (
    <div>
      <Header cartItems={cartItems} />
    <div className='page-container'>
      <h1>{title}</h1>
      <p>Location: {location}</p>
      <p>Price: ₹{price}/month</p>
      <p>Room: {room} BHK</p>
      <button className='book-now'> Book Now
      </button>

      <div className='image-container'>
      <div className='product-images'>
        <img src={product.image.src} className='image-style'/>
      </div>
      <div className='additional-images'>
        <img src={product.additionalImages.src} className='image-style'/>
      </div>
      <div className='additional-images'>
        <img src={product.bedRoom.src} className='image-style'/>
      </div>
      <div className='additional-images'>
        <img src={product.kitchen.src} className='image-style'/>
      </div>
      <div className='additional-images'>
        <img src={product.additionalImages.src} className='image-style'/>
      </div>
      <div className='additional-images'>
        <img src={product.additionalImages.src} className='image-style'/>
      </div>
      </div>
    </div>
    </div>
  );
}
