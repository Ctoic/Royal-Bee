import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { submitOrder } from '../api';
import { CheckCircle } from 'lucide-react';

const paymentOptions = [
  'Credit Card',
  'PayPal',
  'Cash on Delivery'
];

const Checkout: React.FC = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user, token, refreshUser } = useAuth();
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

  if (!user) {
    navigate('/login');
    return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div>Redirecting to login...</div></div>;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    if (!user.id) {
      setError('You must be logged in to place an order.');
      setLoading(false);
      return;
    }
    try {
      const orderPayload = {
        user_id: typeof user.id === 'string' ? parseInt(user.id, 10) : user.id,
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
      const data = await submitOrder(orderPayload, token || undefined);
      setOrder(data); // Save order for confirmation screen
      await refreshUser(); // Update user points after order
      setTimeout(() => clearCart(), 500); // Clear cart after confirmation is shown
    } catch (err: any) {
      setError(err.message || 'Checkout failed');
    } finally {
      setLoading(false);
    }
  };

  if (order) {
    // Confirmation screen
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <div className="text-gray-700 mb-4">Thank you for your purchase. Your order has been placed successfully.</div>
          <div className="mb-4">
            <div className="text-sm text-gray-500">Order ID</div>
            <div className="font-semibold text-lg text-gray-900">{order.id}</div>
          </div>
          <div className="grid grid-cols-1 gap-2 text-left mb-4">
            <div><span className="font-medium">Date:</span> {new Date(order.date).toLocaleString()}</div>
            <div><span className="font-medium">Payment Method:</span> {order.payment}</div>
            <div><span className="font-medium">Billing Name:</span> {form.name}</div>
            <div><span className="font-medium">Billing Address:</span> {order.address}</div>
            <div><span className="font-medium">Phone:</span> {form.phone}</div>
            <div><span className="font-medium">Total:</span> £{order.total.toFixed(2)}</div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Items</h3>
            <ul className="text-sm text-gray-700">
          {order.items.map((item: any, idx: number) => (
            <li key={idx}>
                  {item.product_name} x {item.quantity} ({item.retailer}) - £{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
          </div>
          <button
            onClick={() => navigate('/profile')}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Go to Profile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Checkout</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Option</label>
            <select
              name="payment"
              value={form.payment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
            {paymentOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 mb-2">
            <h3 className="font-semibold mb-2">Order Summary</h3>
            <ul className="text-sm text-gray-700 mb-2">
          {items.map((item, idx) => (
            <li key={idx}>
                  {item.product.name} x {item.quantity} ({item.retailer}) - £{(item.price * item.quantity).toFixed(2)}
            </li>
          ))}
        </ul>
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>£{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            {loading ? 'Processing...' : 'Place Order'}
          </button>
      </form>
      </div>
    </div>
  );
};

export default Checkout; 