import React from 'react';
import { Building, Users, TrendingUp, Award, MapPin, Calendar } from 'lucide-react';

const companyInfo = {
  history: {
    founded: '1949',
    founder: 'Peter and Fred Asquith',
    headquarters: 'Leeds, England',
    timeline: [
      { year: '1949', event: 'First store opened in Pontefract by Peter and Fred Asquith' },
      { year: '1965', event: 'Company went public on the London Stock Exchange' },
      { year: '1999', event: 'Acquired by Walmart, becoming part of the world\'s largest retailer' },
      { year: '2021', event: 'Acquired by Mohsin and Zuber Issa alongside TDR Capital' },
      { year: '2024', event: 'Continues to serve millions of customers across the UK' }
    ]
  },
  financials: {
    revenue: '£23.2 billion',
    employees: '145,000+',
    stores: '630+',
    marketShare: '14.9%'
  },
  customerBase: {
    weeklyCustomers: '18.7 million',
    onlineCustomers: '5.2 million',
    loyaltyMembers: '12.3 million',
    demographics: {
      familyFocused: '65%',
      youngProfessionals: '25%',
      seniors: '10%'
    }
  },
  structure: {
    ceo: 'Mohsin Issa',
    divisions: [
      { name: 'Retail Operations', head: 'Simon Gregg', employees: '120,000' },
      { name: 'Online & Digital', head: 'Simon Gregg', employees: '8,000' },
      { name: 'Supply Chain', head: 'Anthony Hemmerdinger', employees: '15,000' },
      { name: 'Corporate Services', head: 'Various Directors', employees: '2,000' }
    ]
  }
};

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Royal Bee
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Serving families across the UK since 1949 with unbeatable prices and quality products.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Founded in 1949 by brothers Peter and Fred Asquith, Royal Bee has grown from a small Yorkshire retailer 
                into one of the UK's largest supermarket chains. Our commitment to providing quality products at 
                unbeatable prices has remained unchanged for over 75 years.
              </p>
              <p className="text-gray-700">
                Today, we serve over 18.7 million customers weekly across 630+ stores, offering everything from 
                fresh groceries to household essentials, all while maintaining our founding principle of saving 
                customers money.
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-600">{companyInfo.financials.stores}</div>
                  <div className="text-sm text-gray-600">Stores</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{companyInfo.financials.employees}</div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{companyInfo.customerBase.weeklyCustomers}</div>
                  <div className="text-sm text-gray-600">Weekly Customers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">{companyInfo.financials.marketShare}</div>
                  <div className="text-sm text-gray-600">Market Share</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* History Timeline */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-green-600"></div>
            <div className="space-y-8">
              {companyInfo.history.timeline.map((event, index) => (
                <div key={index} className={`flex items-start ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'}`}>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Calendar className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-lg font-bold text-green-600">{event.year}</span>
                      </div>
                      <p className="text-gray-700">{event.event}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-1 md:block hidden"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Financial Performance */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Financial Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.financials.revenue}</div>
              <div className="text-gray-600">Annual Revenue</div>
            </div>
            <div className="text-center p-6 bg-blue-50 rounded-lg">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.financials.employees}</div>
              <div className="text-gray-600">Total Employees</div>
            </div>
            <div className="text-center p-6 bg-purple-50 rounded-lg">
              <Building className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.financials.stores}</div>
              <div className="text-gray-600">Store Locations</div>
            </div>
            <div className="text-center p-6 bg-orange-50 rounded-lg">
              <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
              <div className="text-2xl font-bold text-gray-900 mb-2">{companyInfo.financials.marketShare}</div>
              <div className="text-gray-600">UK Market Share</div>
            </div>
          </div>
        </div>

        {/* Customer Base */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Customers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{companyInfo.customerBase.weeklyCustomers}</div>
              <div className="text-gray-600 mb-4">Weekly Customers</div>
              <p className="text-sm text-gray-700">
                Millions of families trust us for their weekly shopping needs.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{companyInfo.customerBase.onlineCustomers}</div>
              <div className="text-gray-600 mb-4">Online Customers</div>
              <p className="text-sm text-gray-700">
                Growing digital customer base enjoying convenient online shopping.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">{companyInfo.customerBase.loyaltyMembers}</div>
              <div className="text-gray-600 mb-4">Loyalty Members</div>
              <p className="text-sm text-gray-700">
                Customers enjoying exclusive benefits and personalized offers.
              </p>
            </div>
          </div>

          <div className="mt-8 border-t pt-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Customer Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{companyInfo.customerBase.demographics.familyFocused}</div>
                <div className="text-gray-700">Family-Focused Households</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{companyInfo.customerBase.demographics.youngProfessionals}</div>
                <div className="text-gray-700">Young Professionals</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{companyInfo.customerBase.demographics.seniors}</div>
                <div className="text-gray-700">Senior Customers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Organizational Structure */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Organizational Structure</h2>
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">CEO: {companyInfo.structure.ceo}</h3>
            <p className="text-gray-600">Leading Royal Bee's strategic vision and operations</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.structure.divisions.map((division, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{division.name}</h4>
                <p className="text-sm text-gray-600 mb-2">Head: {division.head}</p>
                <p className="text-sm text-gray-700">{division.employees} employees</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Headquarters</h3>
            <p className="text-gray-600">
              {companyInfo.history.headquarters} • Founded {companyInfo.history.founded}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;