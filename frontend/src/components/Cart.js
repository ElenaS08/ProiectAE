// src/components/Cart.js

import React, { useState, useEffect } from 'react';

const Cart = () => {
  // Inițializarea stării cartItems cu un array gol
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Încarcă articolele din coș din localStorage sau API
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(savedCart);
  }, []); // Se execută o singură dată când componenta este montată

  return (
    <div>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p> // Mesaj pentru coșul gol
      ) : (
        cartItems.map(item => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <p>{item.price}</p>
          </div>
        )) // Afișează articolele din coș
      )}
    </div>
  );
};

export default Cart;
