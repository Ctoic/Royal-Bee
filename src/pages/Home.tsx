import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Leaf, Award, Users, TrendingDown, ChevronRight, ChevronLeft, Star, Clock, Percent, Heart } from 'lucide-react';

const Home: React.FC = () => {
  // State for featured product carousel
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState<number | null>(null);

  // Auto-rotate featured products
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  const categories = [
    { name: 'Fruits & Vegetables', image: 'https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Dairy & Eggs', image: 'https://images.pexels.com/photos/90894/pexels-photo-90894.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Meat & Seafood', image: 'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Bakery', image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Beverages', image: 'https://images.pexels.com/photos/312080/pexels-photo-312080.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { name: 'Snacks', image: 'https://images.pexels.com/photos/372851/pexels-photo-372851.jpeg?auto=compress&cs=tinysrgb&w=600' }
  ];

  const saleProducts = [
    {
      id: 1,
      name: 'Organic Strawberries',
      price: 2.99,
      originalPrice: 3.99,
      discount: 25,
      image: 'https://images.pexels.com/photos/934066/pexels-photo-934066.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.5,
      timeLeft: '2 days left'
    },
    {
      id: 2,
      name: 'Free Range Eggs',
      price: 2.49,
      originalPrice: 3.29,
      discount: 24,
      image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.8,
      timeLeft: '1 day left'
    },
    {
      id: 3,
      name: 'Greek Yogurt',
      price: 1.99,
      originalPrice: 2.49,
      discount: 20,
      image: 'https://images.pexels.com/photos/8657568/pexels-photo-8657568.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.3,
      timeLeft: '3 days left'
    },
    {
      id: 4,
      name: 'Whole Grain Bread',
      price: 1.59,
      originalPrice: 1.99,
      discount: 20,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.2,
      timeLeft: '5 days left'
    }
  ];

  const forYouProducts = [
    {
      id: 5,
      name: 'Avocados',
      price: 1.20,
      image: 'https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.7,
      isFavorite: true
    },
    {
      id: 6,
      name: 'Almond Milk',
      price: 1.89,
      image: 'https://images.pexels.com/photos/5946772/pexels-photo-5946772.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.4,
      isFavorite: false
    },
    {
      id: 7,
      name: 'Chicken Breast',
      price: 5.99,
      image: 'https://images.pexels.com/photos/1251208/pexels-photo-1251208.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.6,
      isFavorite: true
    },
    {
      id: 8,
      name: 'Dark Chocolate',
      price: 2.49,
      image: 'https://images.pexels.com/photos/698558/pexels-photo-698558.jpeg?auto=compress&cs=tinysrgb&w=600',
      rating: 4.9,
      isFavorite: false
    }
  ];

  const featuredProducts = [
    {
      id: 9,
      name: 'Organic Bananas',
      price: 1.20,
      image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Rich in potassium and perfect for smoothies or snacks'
    },
    {
      id: 10,
      name: 'Whole Milk (2L)',
      price: 1.35,
      image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fresh and creamy milk from grass-fed cows'
    },
    {
      id: 11,
      name: 'Sourdough Bread',
      price: 1.80,
      image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Artisan quality with natural fermentation'
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section with Carousel */}
      <section className="relative bg-gray-100">
        <div className="relative h-96 md:h-[32rem] overflow-hidden">
          {/* Slide 1 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 0 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-90"></div>
            <img 
              src="https://images.pexels.com/photos/264537/pexels-photo-264537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Fresh Groceries" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Fresh Groceries <br />
                  <span className="text-green-200">Delivered to Your Door</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl">
                  Get the freshest produce at unbeatable prices with our price comparison tool.
                </p>
                  <Link
                    to="/comparison"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
                  >
                  <Search className="w-5 h-5 mr-2" />
                  Start Comparing Prices
                  </Link>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 1 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-90"></div>
            <img 
              src="https://images.pexels.com/photos/396132/pexels-photo-396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Summer Sale" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Summer Sale <br />
                  <span className="text-green-200">Up to 50% Off</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl">
                  Limited time offers on your favorite products across all retailers.
                </p>
                  <Link
                  to="/deals"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
                  >
                  <Percent className="w-5 h-5 mr-2" />
                  View All Deals
                  </Link>
                </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className={`absolute inset-0 transition-opacity duration-1000 ${currentSlide === 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-800 opacity-90"></div>
            <img 
              src="https://images.pexels.com/photos/396228/pexels-photo-396228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Organic Products" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                  Organic & Sustainable <br />
                  <span className="text-green-200">Better for You & the Planet</span>
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl">
                  Discover our selection of eco-friendly products from local suppliers.
                </p>
                <Link
                  to="/organic"
                  className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
                >
                  <Leaf className="w-5 h-5 mr-2" />
                  Browse Organic
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Controls */}
        <button
          onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Browse our wide selection of grocery categories
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Link
                to={`/category/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                key={index}
                className="group relative overflow-hidden rounded-lg aspect-square"
                onMouseEnter={() => setIsHovered(index)}
                onMouseLeave={() => setIsHovered(null)}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex items-end p-4 transition-all duration-300 ${isHovered === index ? 'opacity-100' : 'opacity-90'}`}>
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-green-50">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Royal Bee?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're committed to providing the best shopping experience with innovative features and sustainable practices.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale Section */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Flash Sale</h2>
              <p className="text-green-100">Limited time offers - don't miss out!</p>
            </div>
            <div className="flex items-center mt-4 md:mt-0 bg-green-700 px-4 py-2 rounded-full">
              <Clock className="w-5 h-5 mr-2" />
              <span className="font-medium">Ends in 23:59:59</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.discount}% OFF
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-500 text-xs ml-1">{product.rating}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-green-600 font-bold text-lg">£{product.price.toFixed(2)}</span>
                      <span className="text-gray-400 text-sm line-through ml-2">£{product.originalPrice.toFixed(2)}</span>
                    </div>
                    <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-2 text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {product.timeLeft}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/deals"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center"
            >
              <Percent className="w-5 h-5 mr-2" />
              View All Deals
            </Link>
          </div>
        </div>
      </section>

      {/* For You Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Recommended For You
            </h2>
            <p className="text-xl text-gray-600">
              Products we think you'll love based on your preferences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {forYouProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
                <button className="absolute top-2 right-2 z-10 p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Heart className={`w-5 h-5 ${product.isFavorite ? 'fill-current text-red-500' : ''}`} />
                </button>
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-500 text-xs ml-1">{product.rating}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-green-600 font-bold text-lg">£{product.price.toFixed(2)}</span>
                      <button className="bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
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

          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {featuredProducts.map((product) => (
                  <div key={product.id} className="w-full flex-shrink-0 px-4">
                    <div className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col md:flex-row items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full md:w-1/2 h-64 object-cover rounded-lg mb-4 md:mb-0 md:mr-6"
                      />
                      <div className="md:w-1/2">
                        <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-3xl font-bold text-green-600">£{product.price.toFixed(2)}</span>
                          <TrendingDown className="w-8 h-8 text-green-600" />
                        </div>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        <div className="flex space-x-4">
                          <button className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
                            <ShoppingCart className="w-5 h-5 mr-2" />
                            Add to Cart
                          </button>
                          <button className="border border-green-600 text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <button 
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white shadow-md text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white shadow-md text-green-600 p-2 rounded-full hover:bg-green-50 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-green-600' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl mb-8 text-green-100">
              Join millions of customers who are already saving money with our price comparison tool.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors inline-flex items-center justify-center"
              >
                Sign Up for Free
              </Link>
              <Link
                to="/comparison"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors inline-flex items-center justify-center"
              >
                <Search className="w-5 h-5 mr-2" />
                Start Comparing Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-xl shadow-sm p-8 md:p-12">
            <div className="md:flex items-center justify-between">
              <div className="md:w-1/2 mb-6 md:mb-0">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
                <p className="text-gray-600">Subscribe to our newsletter for the latest deals and updates.</p>
              </div>
              <div className="md:w-1/2">
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-green-600 text-white px-6 py-3 rounded-r-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;