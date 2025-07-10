import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface OrderItem {
  productName: string;
  quantity: number;
  retailer: string;
  price: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  payment: string;
  address: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      // Placeholder: fetch orders for the user
      const response = await fetch(`/api/orders?userId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders || []);
      } else {
        setOrders([]);
      }
      setLoading(false);
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <div><strong>Name:</strong> {user.name}</div>
      <div><strong>Email:</strong> {user.email}</div>
      <div><strong>Joined:</strong> {new Date(user.joinDate).toLocaleDateString()}</div>
      <h3>Your Orders</h3>
      {loading ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id} className="order-item">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Date:</strong> {new Date(order.date).toLocaleString()}</div>
              <div><strong>Payment:</strong> {order.payment}</div>
              <div><strong>Address:</strong> {order.address}</div>
              <div><strong>Total:</strong> ${order.total.toFixed(2)}</div>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.productName} x {item.quantity} ({item.retailer}) - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Profile; 