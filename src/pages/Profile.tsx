import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Calendar, ShoppingBag, CreditCard, Home, Phone, Receipt, 
  Edit, Settings, Heart, Bell, Shield, MapPin, Camera, Star, Package,
  TrendingUp, Award, Clock
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/orders?userId=${user?.id}`);
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        setOrders([]);
      }
      setLoading(false);
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
          <Shield className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Required</h2>
          <p className="text-gray-600">Please log in to view your profile.</p>
        </div>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;

  type TabButtonProps = { id: string; label: string; icon: React.ElementType };
  const TabButton: React.FC<TabButtonProps> = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeTab === id
          ? 'bg-blue-500 text-white shadow-md'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-4 border-white/30">
                <User className="w-16 h-16 text-white" />
              </div>
              <button className="absolute bottom-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <Camera className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                <h1 className="text-3xl font-bold text-white">{user.name}</h1>
                <button className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 transition-colors">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4 text-white/90">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-5 h-5 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Calendar className="w-5 h-5 mr-2" />
                  Member since {new Date(user.joinDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">{totalOrders}</div>
                <div className="text-white/80 text-sm">Total Orders</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center border border-white/30">
                <div className="text-2xl font-bold text-white">£{totalSpent.toFixed(2)}</div>
                <div className="text-white/80 text-sm">Total Spent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-white rounded-xl p-2 shadow-sm border">
          <TabButton id="overview" label="Overview" icon={TrendingUp} />
          <TabButton id="orders" label="Order History" icon={Receipt} />
          <TabButton id="settings" label="Settings" icon={Settings} />
          <TabButton id="wishlist" label="Wishlist" icon={Heart} />
          <TabButton id="notifications" label="Notifications" icon={Bell} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group">
                      <Package className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Track Order</span>
                    </button>
                    <button className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group">
                      <Heart className="w-8 h-8 text-gray-400 group-hover:text-green-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Wishlist</span>
                    </button>
                    <button className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group">
                      <Star className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Reviews</span>
                    </button>
                    <button className="flex flex-col items-center p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors group">
                      <Settings className="w-8 h-8 text-gray-400 group-hover:text-orange-500 mb-2" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-orange-700">Settings</span>
                    </button>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900">Recent Orders</h3>
                    <button className="text-blue-600 hover:text-blue-800 font-medium">View All</button>
                  </div>
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : orders.slice(0, 3).map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 mb-3 last:mb-0">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">Order #{order.id}</div>
                          <div className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-gray-900">£{order.total.toFixed(2)}</div>
                        <div className="text-sm text-green-600">Delivered</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Receipt className="w-6 h-6 text-blue-600 mr-2" />
                  Order History
                </h3>
      {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
      ) : orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                    <p className="text-gray-500">Start shopping to see your orders here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
          {orders.map(order => (
                      <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">Order #{order.id}</h4>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <Clock className="w-4 h-4 mr-1" />
                              {new Date(order.date).toLocaleString()}
                            </div>
                          </div>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                            Delivered
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                          <div className="flex items-center text-gray-700">
                            <CreditCard className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Payment:</span>
                            <span className="ml-1">{order.payment}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Address:</span>
                            <span className="ml-1 truncate">{order.address}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <ShoppingBag className="w-4 h-4 mr-2 text-gray-400" />
                            <span className="font-medium">Total:</span>
                            <span className="ml-1 font-semibold">£{order.total.toFixed(2)}</span>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Items Ordered</h5>
                          <div className="space-y-2">
                {order.items.map((item, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                                <div>
                                  <span className="font-medium text-gray-900">{item.product_name}</span>
                                  <span className="text-gray-500 ml-2">× {item.quantity}</span>
                                  <span className="text-xs text-gray-400 ml-2">({item.retailer})</span>
                                </div>
                                <span className="font-medium text-gray-900">
                                  £{(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        defaultValue={user.name}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+44 123 456 7890"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                      Save Changes
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Billing Address</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Street Address"
                      defaultValue={orders[0]?.address || ''}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code"
                        className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                      Update Address
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Heart className="w-6 h-6 text-red-500 mr-2" />
                  My Wishlist
                </h3>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h4>
                  <p className="text-gray-500">Save items you love for later.</p>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                  <Bell className="w-6 h-6 text-blue-600 mr-2" />
                  Notification Settings
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Order updates', description: 'Get notified about your order status' },
                    { label: 'Promotions', description: 'Receive deals and special offers' },
                    { label: 'New arrivals', description: 'Be first to know about new products' },
                    { label: 'Price drops', description: 'Get alerts when wishlist items go on sale' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
                      <div>
                        <div className="font-medium text-gray-900">{item.label}</div>
                        <div className="text-sm text-gray-500">{item.description}</div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Member Level</span>
                  <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs font-medium">Gold</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Reward Points</span>
                  <span className="font-semibold text-gray-900">{user.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Next Reward</span>
                  <span className="text-blue-600 font-medium">{user.points ? 250 - (user.points % 250) : 250} points</span>
                </div>
              </div>
            </div>

            {/* Achievement Badge */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100 p-6">
              <div className="flex items-center mb-3">
                <Award className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-purple-900">Loyal Customer</h4>
                  <p className="text-sm text-purple-700">5+ orders completed</p>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Contact Support</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg hover:bg-gray-50 flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <span className="text-gray-700">Send Message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 
