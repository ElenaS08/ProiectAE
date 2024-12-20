import React from 'react';
import axios from 'axios';

const Checkout = ({ cartItems, total }) => {
  const handleCheckout = async () => {
    const orderData = {
      userId: 1,  
      total: total,
      products: cartItems.map(item => ({
        id: item.product.id,
        quantity: item.quantity,
      })),
    };

    try {
      await axios.post('http://localhost:8080/orders', orderData);
      alert('Comanda a fost plasată cu succes!');
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout">
      <button onClick={handleCheckout}>Finalizează comanda</button>
    </div>
  );
};

export default Checkout;
