import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Calendar, ShoppingBag, CreditCard, Home, Phone, Receipt } from 'lucide-react';
import { API_URL } from '../api';

interface OrderItem {
  product_name: string;
  quantity: number;
  retailer: string;
  price: number;
}

interface Order {
  id: number;
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
      const response = await fetch(`${API_URL}/api/orders?userId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched orders:', data);
        setOrders(data);
      } else {
        setOrders([]);
      }
      setLoading(false);
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div>Please log in to view your profile.</div></div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full mb-8">
        <div className="flex items-center mb-6">
          <User className="w-12 h-12 text-green-600 mr-4" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{user.name}</h2>
            <div className="flex items-center text-gray-600 text-sm mb-1"><Mail className="w-4 h-4 mr-1" />{user.email}</div>
            <div className="flex items-center text-gray-600 text-sm"><Calendar className="w-4 h-4 mr-1" />Joined: {new Date(user.joinDate).toLocaleDateString()}</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-700"><Home className="w-5 h-5 mr-2" />Billing Address: <span className="ml-1 font-medium">{orders[0]?.address || 'N/A'}</span></div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><Receipt className="w-6 h-6 text-green-600 mr-2" />Order History</h3>
        {loading ? (
          <div>Loading orders...</div>
        ) : orders.length === 0 ? (
          <div>No orders found.</div>
        ) : (
          <ul className="space-y-8">
            {orders.map(order => (
              <li key={order.id} className="border-b pb-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-lg text-gray-900">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">{new Date(order.date).toLocaleString()}</div>
                </div>
                <div className="flex flex-wrap gap-4 mb-2">
                  <div className="flex items-center text-gray-700"><CreditCard className="w-4 h-4 mr-1" />Payment: <span className="ml-1 font-medium">{order.payment}</span></div>
                  <div className="flex items-center text-gray-700"><Home className="w-4 h-4 mr-1" />Address: <span className="ml-1 font-medium">{order.address}</span></div>
                  <div className="flex items-center text-gray-700"><ShoppingBag className="w-4 h-4 mr-1" />Total: <span className="ml-1 font-medium">£{order.total.toFixed(2)}</span></div>
                </div>
                <div className="mb-2">
                  <h4 className="font-semibold text-gray-800 mb-1">Items</h4>
                  <ul className="text-sm text-gray-700">
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.product_name} x {item.quantity} ({item.retailer}) - £{(item.price * item.quantity).toFixed(2)}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile; 