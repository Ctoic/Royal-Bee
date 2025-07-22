import React from 'react';
import { Leaf, Recycle, Truck, Factory, Award, TrendingDown, Users, Globe } from 'lucide-react';

const sustainabilityData = {
  carbonFootprint: {
    reduction: '35%',
    target: '50% by 2030',
    initiatives: [
      'Renewable energy in all stores',
      'Electric delivery fleet',
      'Sustainable packaging',
      'Local sourcing programs'
    ]
  },
  supplierNetwork: {
    localSuppliers: '75%',
    sustainableSourcing: '88%',
    certifications: ['Fair Trade', 'Organic', 'RSPCA Assured', 'FSC Certified']
  },
  wasteReduction: {
    foodWaste: '40% reduction',
    packaging: '30% reduction',
    recycling: '95% of waste recycled'
  }
};

const Sustainability: React.FC = () => {
  const impactAreas = [
    {
      icon: <TrendingDown className="w-8 h-8 text-green-600" />,
      title: 'Carbon Footprint Reduction',
      description: 'Reducing emissions across our entire supply chain',
      achievement: sustainabilityData.carbonFootprint.reduction + ' reduction achieved',
      target: 'Target: ' + sustainabilityData.carbonFootprint.target
    },
    {
      icon: <Recycle className="w-8 h-8 text-blue-600" />,
      title: 'Waste Reduction',
      description: 'Minimizing waste through innovative packaging and recycling',
      achievement: sustainabilityData.wasteReduction.recycling + ' of waste recycled',
      target: 'Food waste: ' + sustainabilityData.wasteReduction.foodWaste + ' reduction'
    },
    {
      icon: <Factory className="w-8 h-8 text-purple-600" />,
      title: 'Local Sourcing',
      description: 'Supporting local suppliers and reducing transportation emissions',
      achievement: sustainabilityData.supplierNetwork.localSuppliers + ' local suppliers',
      target: 'Sustainable sourcing: ' + sustainabilityData.supplierNetwork.sustainableSourcing
    },
    {
      icon: <Users className="w-8 h-8 text-orange-600" />,
      title: 'Community Impact',
      description: 'Supporting local communities and ethical sourcing',
      achievement: 'Multiple certifications achieved',
      target: 'Continuous improvement in social responsibility'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Globe className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sustainable Supply Chain
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Building a more sustainable future through responsible sourcing, reduced emissions, and innovative practices.
          </p>
        </div>

        {/* Impact Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Environmental Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactAreas.map((area, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="mb-4">{area.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                <div className="text-sm font-medium text-green-600 mb-1">{area.achievement}</div>
                <div className="text-xs text-gray-500">{area.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Carbon Footprint Section */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Carbon Footprint Reduction</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-semibold text-gray-900">Current Reduction</span>
                    <span className="text-2xl font-bold text-green-600">{sustainabilityData.carbonFootprint.reduction}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Target: {sustainabilityData.carbonFootprint.target}</p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900">Key Initiatives</h3>
                  {sustainabilityData.carbonFootprint.initiatives.map((initiative, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="text-gray-700">{initiative}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-lg">
              <Leaf className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">How We're Making a Difference</h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Transitioning to 100% renewable energy across all stores and warehouses
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Implementing electric delivery vehicles for last-mile deliveries
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Optimizing supply chain routes to reduce transportation emissions
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  Partnering with suppliers committed to sustainable practices
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Supplier Network */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Sustainable Supplier Network</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Local Sourcing</h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-blue-600">{sustainabilityData.supplierNetwork.localSuppliers}</div>
                  <div className="text-gray-600">of suppliers are local</div>
                </div>
                <p className="text-sm text-gray-700 text-center">
                  Supporting local communities while reducing transportation emissions and ensuring fresher products.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable Sourcing</h3>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600">{sustainabilityData.supplierNetwork.sustainableSourcing}</div>
                  <div className="text-gray-600">sustainable sourcing</div>
                </div>
                <p className="text-sm text-gray-700 text-center">
                  Ensuring ethical and environmental standards across our entire supply chain.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Certifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sustainabilityData.supplierNetwork.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg text-center">
                  <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <span className="text-sm font-medium text-gray-900">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Waste Reduction */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Waste Reduction Initiatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-100 p-6 rounded-lg mb-4">
                <div className="text-3xl font-bold text-red-600 mb-2">{sustainabilityData.wasteReduction.foodWaste}</div>
                <div className="text-gray-600">Food Waste Reduction</div>
              </div>
              <p className="text-sm text-gray-700">
                Implementing smart inventory management and partnering with food banks to reduce waste.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-blue-100 p-6 rounded-lg mb-4">
                <div className="text-3xl font-bold text-blue-600 mb-2">{sustainabilityData.wasteReduction.packaging}</div>
                <div className="text-gray-600">Packaging Reduction</div>
              </div>
              <p className="text-sm text-gray-700">
                Transitioning to recyclable and biodegradable packaging materials across all products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 p-6 rounded-lg mb-4">
                <div className="text-3xl font-bold text-green-600 mb-2">{sustainabilityData.wasteReduction.recycling}</div>
                <div className="text-gray-600">Waste Recycled</div>
              </div>
              <p className="text-sm text-gray-700">
                Comprehensive recycling programs ensuring minimal waste goes to landfills.
              </p>
            </div>
          </div>
        </div>

        {/* Customer Impact */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg p-8 mb-8">
          <div className="text-center">
            <Users className="w-16 h-16 mx-auto mb-6 text-green-200" />
            <h2 className="text-3xl font-bold mb-4">Your Role in Sustainability</h2>
            <p className="text-xl mb-8 text-green-100 max-w-3xl mx-auto">
              Every purchase you make supports our sustainable supply chain and helps reduce environmental impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Truck className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-2">Choose Local Products</h3>
                <p className="text-sm text-green-100">
                  Support local suppliers and reduce transportation emissions
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Recycle className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-2">Recycle Packaging</h3>
                <p className="text-sm text-green-100">
                  Properly dispose of packaging to support circular economy
                </p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-6">
                <Award className="w-8 h-8 mx-auto mb-3 text-green-200" />
                <h3 className="font-semibold mb-2">Choose Certified Products</h3>
                <p className="text-sm text-green-100">
                  Look for Fair Trade, Organic, and other sustainability certifications
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our 2030 Sustainability Goals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">50% reduction in carbon emissions</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">100% renewable energy in all operations</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">Zero waste to landfill</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">90% local sourcing for fresh products</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Carbon-neutral delivery fleet</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">100% recyclable packaging</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Enhanced supplier sustainability standards</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                <span className="text-gray-700">Community sustainability programs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sustainability;