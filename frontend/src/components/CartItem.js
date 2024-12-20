import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="cart-item">
      <h4>{item.product.name}</h4>
      <p>Cantitate: {item.quantity}</p>
      <button onClick={() => removeFromCart(item.product.id)}>Șterge</button>
    </div>
  );
};

export default CartItem;
