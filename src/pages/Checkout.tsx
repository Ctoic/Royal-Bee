import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const paymentOptions = [
  'Credit Card',
  'PayPal',
  'Cash on Delivery'
];

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || '',
    address: '',
    phone: '',
    payment: paymentOptions[0],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState<any>(null); // Store order confirmation

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const orderPayload = {
        user_id: user?.id,
        date: new Date().toISOString(),
        total: getTotalPrice(),
        payment: form.payment,
        address: form.address,
        items: items.map(item => ({
          product_name: item.product.name,
          quantity: item.quantity,
          retailer: item.retailer,
          price: item.price,
        })),
      };
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });
      if (!response.ok) throw new Error('Failed to place order');
      const data = await response.json();
      setOrder(data); // Save order for confirmation screen
      clearCart();
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    // Confirmation screen
    return (
      <div className="order-confirmation">
        <h2>Order Confirmed!</h2>
        <div><strong>Order ID:</strong> {order.id}</div>
        <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
        <div><strong>Payment:</strong> {order.payment}</div>
        <div><strong>Address:</strong> {order.address}</div>
        <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
        <h3>Items</h3>
        <ul>
          {order.items.map((item: any, idx: number) => (
            <li key={idx}>
              {item.product_name} x {item.quantity} ({item.retailer}) - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <button onClick={() => navigate('/profile')}>Go to Profile</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label>
          Name:
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input name="address" value={form.address} onChange={handleChange} required />
        </label>
        <label>
          Phone:
          <input name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <label>
          Payment Option:
          <select name="payment" value={form.payment} onChange={handleChange} required>
            {paymentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <h3>Order Summary</h3>
        <ul>
          {items.map((item, idx) => (
            <li key={idx}>
              {item.product.name} x {item.quantity} ({item.retailer}) - ${item.price * item.quantity}
            </li>
          ))}
        </ul>
        <div>Total: ${getTotalPrice().toFixed(2)}</div>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={loading}>{loading ? 'Processing...' : 'Place Order'}</button>
      </form>
    </div>
  );
};

export default Checkout; 