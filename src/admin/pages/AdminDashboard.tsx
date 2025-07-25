import React, { useEffect, useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { fetchAdminMetrics, fetchAdminUsers, fetchAdminOrders, fetchAdminProducts, addAdminProduct } from '../adminApi';
import { useNavigate } from 'react-router-dom';
import {
  Users, ShoppingCart, Package, Store, TrendingUp, TrendingDown,
  AlertTriangle, Clock, Activity, DollarSign, Eye, Search,
  Filter, Download, RefreshCw, Plus, Edit, Trash2, MoreHorizontal,
  Calendar, Bell, Settings, LogOut, Menu, X, ChevronDown,
  BarChart3, PieChart, LineChart, Target, Award, Zap, Grid3X3, Star
} from 'lucide-react';

type StatCardProps = {
  title: string;
  value: any;
  change?: string;
  icon: React.ElementType;
  color: string;
  trend?: 'up' | 'down';
};
const StatCard: React.FC<StatCardProps> = ({ title, value, change, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border p-6 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
            {change}
          </div>
        )}
      </div>
      <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

type ActionButtonProps = {
  icon: React.ElementType;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
};
const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, label, onClick, variant = 'primary' }) => {
  const baseClasses = "inline-flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200";
  const variants: { [key: string]: string } = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md",
    secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
    danger: "bg-red-600 text-white hover:bg-red-700 hover:shadow-md",
    success: "bg-green-600 text-white hover:bg-green-700 hover:shadow-md"
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]}`}>
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );
};

const AdminDashboard: React.FC = () => {
  const { admin, token, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState('7d');
  const [products, setProducts] = useState<any[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', image: '', description: '', price: '' });
  const [addProductError, setAddProductError] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchAdminMetrics(token!).then(setMetrics).finally(() => setLoading(false));
    fetchAdminUsers(token!).then(setUsers).finally(() => setUsersLoading(false));
    fetchAdminOrders(token!).then(setOrders).finally(() => setOrdersLoading(false));
    fetchAdminProducts(token!).then(setProducts).finally(() => setProductsLoading(false));
  }, [isAuthenticated, token, navigate]);

  if (!isAuthenticated) return null;

  if (loading || !metrics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'inventory', label: 'Inventory', icon: Store },
    { id: 'analytics', label: 'Analytics', icon: PieChart },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-16'} flex flex-col`}>
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <div>
                <h2 className="text-xl font-bold text-gray-900">Royal Bee</h2>
                <p className="text-sm text-gray-600">Admin Panel</p>
              </div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
            {sidebarOpen && (
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{admin?.username?.[0] || 'A'}</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{admin?.username || 'Admin'}</p>
                  <p className="text-xs text-gray-600">Store Manager</p>
                </div>
              </div>
            )}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <LogOut className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {sidebarItems.find(item => item.id === activeTab)?.label || 'Dashboard'}
              </h1>
              <p className="text-gray-600">Welcome back, {admin?.username || 'Admin'}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <ActionButton icon={RefreshCw} label="Refresh" onClick={() => window.location.reload()} variant="secondary" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                  title="Total Revenue"
                  value={`£${metrics.revenue?.toLocaleString() || '0'}`}
                  change="+12.5%"
                  icon={DollarSign}
                  color="from-green-500 to-emerald-600"
                  trend="up"
                />
                <StatCard
                  title="Total Users"
                  value={metrics.totalUsers?.toLocaleString() || '0'}
                  change="+5.2%"
                  icon={Users}
                  color="from-blue-500 to-indigo-600"
                  trend="up"
                />
                <StatCard
                  title="Orders Today"
                  value={metrics.ordersToday || '0'}
                  change="+8.1%"
                  icon={ShoppingCart}
                  color="from-purple-500 to-pink-600"
                  trend="up"
                />
                <StatCard
                  title="Active Users"
                  value={metrics.activeUsers || '0'}
                  change="-2.3%"
                  icon={Activity}
                  color="from-orange-500 to-red-600"
                  trend="down"
                />
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                  title="Weekly Orders"
                  value={metrics.ordersThisWeek || '0'}
                  icon={Calendar}
                  color="from-cyan-500 to-blue-600"
                />
                <StatCard
                  title="Total Products"
                  value={metrics.totalProducts || '0'}
                  icon={Package}
                  color="from-indigo-500 to-purple-600"
                />
                <StatCard
                  title="Total Stores"
                  value={metrics.totalStores || '0'}
                  icon={Store}
                  color="from-pink-500 to-rose-600"
                />
              </div>

              {/* Charts and Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Products */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
                    <div className="flex space-x-2">
                      <ActionButton icon={Eye} label="View All" variant="secondary" onClick={() => {}} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {(metrics.topProducts || []).slice(0, 5).map((product: any, index: any) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                            index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                          }`}>
                            {index + 1}
                          </div>
                          <span className="ml-3 font-medium text-gray-900">{product.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-gray-900">{product.sold} sold</span>
                          <div className="text-sm text-gray-500">£{(product.revenue || 0).toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                      Low Stock Alerts
                    </h3>
                    <ActionButton icon={Plus} label="Restock" variant="primary" onClick={() => {}} />
                  </div>
                  <div className="space-y-4">
                    {(metrics.lowStock || []).slice(0, 5).map((product: any, index: any) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-red-200 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                          <span className="font-medium text-gray-900">{product.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-red-600">{product.stock} left</span>
                          <div className="text-sm text-gray-500">Min: {product.minStock || 10}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">New order #1234 received</p>
                      <p className="text-sm text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">5 new users registered</p>
                      <p className="text-sm text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-gray-900">Product inventory updated</p>
                      <p className="text-sm text-gray-500">3 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-6">
              {/* Order Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Pending Orders" value="23" icon={Clock} color="from-yellow-500 to-orange-600" />
                <StatCard title="Processing" value="15" icon={Package} color="from-blue-500 to-indigo-600" />
                <StatCard title="Completed Today" value="48" icon={Target} color="from-green-500 to-emerald-600" />
                <StatCard title="Cancelled" value="2" icon={X} color="from-red-500 to-pink-600" />
              </div>

              {/* Order Management */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Order Management</h3>
                    <div className="flex space-x-3">
                      <ActionButton icon={Filter} label="Filter" variant="secondary" onClick={() => {}} />
                      <ActionButton icon={Download} label="Export" variant="secondary" onClick={() => {}} />
                      <ActionButton icon={Plus} label="Manual Order" variant="primary" onClick={() => {}} />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.slice(0, 10).map((order, index) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{order.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">User {order.user_id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              index % 3 === 0 ? 'bg-green-100 text-green-800' :
                              index % 3 === 1 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {index % 3 === 0 ? 'Delivered' : index % 3 === 1 ? 'Processing' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">£{order.total?.toFixed(2)}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Users" value={metrics.totalUsers || '0'} icon={Users} color="from-blue-500 to-indigo-600" />
                <StatCard title="Active Today" value={metrics.activeUsers || '0'} icon={Activity} color="from-green-500 to-emerald-600" />
                <StatCard title="New This Week" value="127" icon={TrendingUp} color="from-purple-500 to-pink-600" />
                <StatCard title="Premium Users" value="89" icon={Award} color="from-yellow-500 to-orange-600" />
              </div>

              {/* User Management */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
                    <div className="flex space-x-3">
                      <ActionButton icon={Filter} label="Filter" variant="secondary" onClick={() => {}} />
                      <ActionButton icon={Download} label="Export Users" variant="secondary" onClick={() => {}} />
                      <ActionButton icon={Plus} label="Add User" variant="primary" onClick={() => {}} />
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.slice(0, 10).map((user, index) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">{user.name?.[0] || 'U'}</span>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                <div className="text-sm text-gray-500">@{user.username}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                              {user.role || 'Customer'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.points || 0}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {index % 2 === 0 ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'inventory' && (
            <div className="space-y-6">
              {/* Inventory Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={metrics.totalProducts || '0'} icon={Package} color="from-blue-500 to-indigo-600" />
                <StatCard title="Low Stock Items" value={(metrics.lowStock || []).length} icon={AlertTriangle} color="from-red-500 to-pink-600" />
                <StatCard title="Out of Stock" value="12" icon={X} color="from-gray-500 to-gray-600" />
                <StatCard title="Total Value" value="£45,892" icon={DollarSign} color="from-green-500 to-emerald-600" />
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <ActionButton icon={Plus} label="Add Product" variant="primary" onClick={() => {}} />
                  <ActionButton icon={Package} label="Bulk Import" variant="secondary" onClick={() => {}} />
                  <ActionButton icon={Download} label="Export Inventory" variant="secondary" onClick={() => {}} />
                  <ActionButton icon={AlertTriangle} label="Stock Alerts" variant="danger" onClick={() => {}} />
                </div>
              </div>

              {/* Stock Alerts */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Critical Stock Levels</h3>
                <div className="space-y-4">
                  {(metrics.lowStock || []).map((product: any, index: any) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-red-200 bg-red-50 rounded-lg">
                      <div className="flex items-center">
                        <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">SKU: {product.sku || `PRD-${index + 1000}`}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <span className="font-semibold text-red-600">{product.stock} remaining</span>
                          <div className="text-sm text-gray-500">Min: {product.minStock || 10}</div>
                        </div>
                        <ActionButton icon={Plus} label="Restock" variant="primary" onClick={() => {}} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Analytics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  title="Revenue Growth" 
                  value="+23.5%" 
                  change="vs last month" 
                  icon={TrendingUp} 
                  color="from-green-500 to-emerald-600"
                  trend="up" 
                />
                <StatCard 
                  title="Conversion Rate" 
                  value="3.4%" 
                  change="+0.8%" 
                  icon={Target} 
                  color="from-blue-500 to-indigo-600"
                  trend="up" 
                />
                <StatCard 
                  title="Avg Order Value" 
                  value="£47.82" 
                  change="+£5.20" 
                  icon={DollarSign} 
                  color="from-purple-500 to-pink-600"
                  trend="up" 
                />
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
                    <select className="border border-gray-200 rounded-lg px-3 py-1 text-sm">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 3 months</option>
                    </select>
                  </div>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <LineChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Sales chart would render here</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
                    <ActionButton icon={Eye} label="View Details" variant="secondary" onClick={() => {}} />
                  </div>
                  <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Category chart would render here</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-sm text-gray-600">Monthly Visitors</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <ShoppingCart className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">98</p>
                    <p className="text-sm text-gray-600">Orders/Day</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">24min</p>
                    <p className="text-sm text-gray-600">Avg Session</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900">4.8★</p>
                    <p className="text-sm text-gray-600">Customer Rating</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Product Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={metrics.totalProducts || '0'} icon={Package} color="from-blue-500 to-indigo-600" />
                <StatCard title="Categories" value="24" icon={Grid3X3} color="from-green-500 to-emerald-600" />
                <StatCard title="Featured Products" value="15" icon={Star} color="from-yellow-500 to-orange-600" />
                <StatCard title="Draft Products" value="8" icon={Edit} color="from-gray-500 to-gray-600" />
              </div>

              {/* Product Management */}
              <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Product Catalog</h3>
                    <div className="flex space-x-3">
                      <ActionButton icon={Plus} label="Add Product" onClick={() => setShowAddProduct(true)} variant="primary" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  {productsLoading ? (
                    <div>Loading products...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
                            ) : (
                              <Package className="w-12 h-12 text-gray-400" />
                            )}
                          </div>
                          <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                          <p className="text-sm text-gray-500 mb-3">Category: {product.category}</p>
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-lg font-bold text-gray-900">£{product.price?.toFixed(2)}</span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">Edit</button>
                            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"><MoreHorizontal className="w-4 h-4 text-gray-600" /></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Settings Sections */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Store Settings */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Store Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
                      <input
                        type="text"
                        defaultValue="Royal Bee Store"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Store Description</label>
                      <textarea
                        rows={3}
                        defaultValue="Premium grocery store with the best prices"
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <ActionButton icon={Settings} label="Update Settings" variant="primary" onClick={() => {}} />
                  </div>
                </div>

                {/* System Settings */}
                <div className="bg-white rounded-xl shadow-sm border p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">System Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Email Notifications</p>
                        <p className="text-sm text-gray-500">Receive order and system updates</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Auto Backup</p>
                        <p className="text-sm text-gray-500">Daily automatic data backup</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* System Status */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Zap className="w-6 h-6 text-green-600" />
                    </div>
                    <p className="font-medium text-gray-900">System Health</p>
                    <p className="text-sm text-green-600">Excellent</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Activity className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-900">Uptime</p>
                    <p className="text-sm text-blue-600">{metrics.uptime || '99.9%'}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Clock className="w-6 h-6 text-yellow-600" />
                    </div>
                    <p className="font-medium text-gray-900">Response Time</p>
                    <p className="text-sm text-yellow-600">{metrics.latency || '120ms'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button className="absolute top-2 right-2 p-2" onClick={() => setShowAddProduct(false)}><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setAddProductError('');
              try {
                await addAdminProduct(token!, { ...newProduct, price: parseFloat(newProduct.price) });
                setShowAddProduct(false);
                setNewProduct({ name: '', category: '', image: '', description: '', price: '' });
                fetchAdminProducts(token!).then(setProducts);
              } catch (err: any) {
                setAddProductError(err.message || 'Failed to add product');
              }
            }}>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input className="w-full border rounded px-3 py-2" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Category</label>
                <input className="w-full border rounded px-3 py-2" value={newProduct.category} onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} required />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input className="w-full border rounded px-3 py-2" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea className="w-full border rounded px-3 py-2" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
              </div>
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Price</label>
                <input type="number" step="0.01" className="w-full border rounded px-3 py-2" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
              </div>
              {addProductError && <div className="text-red-600 text-sm mb-2">{addProductError}</div>}
              <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors mt-2">Add Product</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
                          