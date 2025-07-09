import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Leaf, Award, Users, TrendingDown } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: <Search className="w-8 h-8 text-green-600" />,
      title: 'Price Comparison',
      description: 'Compare prices across multiple retailers to find the best deals on your favorite products.'
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
      title: 'Easy Shopping',
      description: 'Add items to your cart and place orders with just a few clicks.'
    },
    {
      icon: <Leaf className="w-8 h-8 text-green-600" />,
      title: 'Sustainable Supply Chain',
      description: 'Reduce your carbon footprint with our eco-friendly sourcing and delivery options.'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'Quality Guaranteed',
      description: 'All products are carefully selected for quality and freshness.'
    }
  ];

  const stats = [
    { value: '18.7M', label: 'Weekly Customers' },
    { value: '630+', label: 'Stores Nationwide' },
    { value: '35%', label: 'Carbon Reduction' },
    { value: '75%', label: 'Local Suppliers' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Unbeatable Prices, <br />
              <span className="text-green-200">Uncompromising Quality</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto">
              Compare prices across retailers, shop sustainably, and save money on everything your family needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/comparison"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Start Comparing Prices
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Asda?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best shopping experience with innovative features and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Check out our popular products with competitive prices across retailers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <img
                src="https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Organic Bananas"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Organic Bananas</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">£1.20</span>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Best price compared to other retailers</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <img
                src="https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Whole Milk"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Whole Milk (2L)</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">£1.35</span>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Fresh and competitively priced</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
              <img
                src="https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sourdough Bread"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Sourdough Bread</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-green-600">£1.80</span>
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Artisan quality, everyday price</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              to="/comparison"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center"
            >
              <Search className="w-5 h-5 mr-2" />
              Compare All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 text-green-200" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join 18.7 Million Weekly Customers
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Experience the convenience of price comparison, sustainable shopping, and unbeatable value.
          </p>
          <Link
            to="/comparison"
            className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Start Shopping Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;