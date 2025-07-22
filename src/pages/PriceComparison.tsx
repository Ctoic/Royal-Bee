import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, Star, ShoppingCart, Truck, AlertCircle } from 'lucide-react';
import { getProducts } from '../api';
import { useCart } from '../context/CartContext';

interface Retailer {
  id?: number;
  name: string;
  price?: number;
  logo?: string;
  description?: string;
  rating?: number;
  delivery_options?: string;
  product_id?: number;
}

interface Product {
  id: number;
  name: string;
  category: string;
  image?: string;
  description?: string;
  price?: number;
  retailers?: Retailer[];
}

const PriceComparison: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('price-low');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const categories = ['all', 'Fresh Produce', 'Dairy', 'Bakery', 'Meat', 'Pantry'];

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    return filtered.sort((a, b) => {
      // If retailers are present, sort by best price, else fallback
      const aPrice = a.retailers ? Math.min(...a.retailers.map(r => r.price || 0)) : 0;
      const bPrice = b.retailers ? Math.min(...b.retailers.map(r => r.price || 0)) : 0;
      switch (sortBy) {
        case 'price-low':
          return aPrice - bPrice;
        case 'price-high':
          return bPrice - aPrice;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [searchTerm, selectedCategory, sortBy, products]);

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return 'text-green-600';
      case 'limited':
        return 'text-yellow-600';
      case 'out-of-stock':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'in-stock':
        return '✓';
      case 'limited':
        return '⚠';
      case 'out-of-stock':
        return '✗';
      default:
        return '?';
    }
  };

  const handleAddToCart = (product: Product, retailer?: Retailer) => {
    if (!retailer) return;
    addToCart(product as any, retailer.name, retailer.price || 0);
  };

  if (loading) {
    return <div className="p-8 text-center">Loading products...</div>;
  }
  if (error) {
    return <div className="p-8 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Price Comparison
          </h1>
          <p className="text-xl text-gray-600">
            Compare prices across retailers and find the best deals on your favorite products.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product) => {
            const bestPrice = product.retailers && product.retailers.length > 0 ? Math.min(...product.retailers.map(r => r.price || 0)) : 0;
            const bestRetailer = product.retailers && product.retailers.length > 0 ? product.retailers.find(r => (r.price || 0) === bestPrice) : undefined;

            return (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <p className="text-sm text-gray-700 mb-3">{product.description}</p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-green-600">£{bestPrice.toFixed(2)}</span>
                          <span className="text-sm text-gray-600 ml-2">{bestRetailer ? `at ${bestRetailer.name}` : ''}</span>
                        </div>
                        <button
                          onClick={() => setSelectedProduct(selectedProduct?.id === product.id ? null : product)}
                          className="px-4 py-2 text-sm font-medium text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                        >
                          {selectedProduct?.id === product.id ? 'Hide Details' : 'Compare Prices'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {selectedProduct?.id === product.id && product.retailers && (
                    <div className="mt-6 border-t pt-6">
                      <h4 className="text-lg font-semibold mb-4">Price Comparison</h4>
                      <div className="space-y-3">
                        {product.retailers.slice(0, 4).map((retailer, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="text-2xl">{retailer.name === 'Royal Bee' ? '🐝' : retailer.name === 'Tesco' ? '🏪' : retailer.name === 'Sainsbury\'s' ? '🛍️' : '🏬'}</div>
                              <div>
                                <div className="font-medium">{retailer.name}</div>
                                <div className="text-sm text-gray-600 flex items-center space-x-2">
                                  <span className={getAvailabilityColor(retailer.delivery_options || '')}>
                                    {getAvailabilityIcon(retailer.delivery_options || '')} {retailer.delivery_options?.replace('-', ' ')}
                                  </span>
                                  <span>•</span>
                                  <span className="flex items-center">
                                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                    {retailer.rating}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-gray-900">£{retailer.price?.toFixed(2) || ''}</span>
                              </div>
                              <div className="text-sm text-gray-600 flex items-center">
                                <Truck className="w-3 h-3 mr-1" />
                                {retailer.delivery_options}
                              </div>
                              <button
                                onClick={() => handleAddToCart(product, retailer)}
                                disabled={retailer.delivery_options === 'out-of-stock'}
                                className={`mt-2 px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                                  retailer.delivery_options === 'out-of-stock'
                                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                }`}
                              >
                                <ShoppingCart className="w-3 h-3 mr-1 inline" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComparison;