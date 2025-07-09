export interface Product {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  retailers: {
    name: string;
    price: number;
    originalPrice?: number;
    availability: 'in-stock' | 'limited' | 'out-of-stock';
    rating: number;
    deliveryTime: string;
  }[];
}

export interface Retailer {
  id: string;
  name: string;
  logo: string;
  description: string;
  rating: number;
  deliveryOptions: string[];
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Bananas (6 pack)',
    category: 'Fresh Produce',
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh organic bananas, perfect for snacking or baking',
    retailers: [
      { name: 'Royal Bee', price: 1.20, originalPrice: 1.50, availability: 'in-stock', rating: 4.5, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 1.30, availability: 'in-stock', rating: 4.3, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 1.25, availability: 'limited', rating: 4.2, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 1.35, availability: 'in-stock', rating: 4.1, deliveryTime: '2-3 days' },
    ]
  },
  {
    id: '2',
    name: 'Whole Milk (2L)',
    category: 'Dairy',
    image: 'https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh whole milk, rich in calcium and protein',
    retailers: [
      { name: 'Royal Bee', price: 1.35, availability: 'in-stock', rating: 4.6, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 1.40, availability: 'in-stock', rating: 4.4, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 1.45, availability: 'in-stock', rating: 4.3, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 1.38, availability: 'in-stock', rating: 4.2, deliveryTime: '2-3 days' },
    ]
  },
  {
    id: '3',
    name: 'Sourdough Bread',
    category: 'Bakery',
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Artisan sourdough bread, freshly baked daily',
    retailers: [
      { name: 'Royal Bee', price: 1.80, availability: 'in-stock', rating: 4.7, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 1.95, availability: 'in-stock', rating: 4.5, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 1.85, availability: 'limited', rating: 4.4, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 1.90, availability: 'in-stock', rating: 4.3, deliveryTime: '2-3 days' },
    ]
  },
  {
    id: '4',
    name: 'Free-Range Eggs (12 pack)',
    category: 'Fresh Produce',
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh free-range eggs from happy hens',
    retailers: [
      { name: 'Royal Bee', price: 2.20, availability: 'in-stock', rating: 4.8, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 2.30, availability: 'in-stock', rating: 4.6, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 2.25, availability: 'in-stock', rating: 4.5, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 2.35, availability: 'limited', rating: 4.4, deliveryTime: '2-3 days' },
    ]
  },
  {
    id: '5',
    name: 'Pasta - Penne (500g)',
    category: 'Pantry',
    image: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?auto=compress&cs=tinysrgb&w=400',
    description: 'Premium durum wheat pasta, perfect for family meals',
    retailers: [
      { name: 'Royal Bee', price: 0.85, availability: 'in-stock', rating: 4.4, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 0.90, availability: 'in-stock', rating: 4.3, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 0.88, availability: 'in-stock', rating: 4.2, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 0.92, availability: 'in-stock', rating: 4.1, deliveryTime: '2-3 days' },
    ]
  },
  {
    id: '6',
    name: 'Chicken Breast (500g)',
    category: 'Meat',
    image: 'https://images.pexels.com/photos/3688/food-dinner-lunch-chicken.jpg?auto=compress&cs=tinysrgb&w=400',
    description: 'Fresh chicken breast, high in protein',
    retailers: [
      { name: 'Royal Bee', price: 3.50, availability: 'in-stock', rating: 4.6, deliveryTime: 'Same day' },
      { name: 'Tesco', price: 3.65, availability: 'in-stock', rating: 4.5, deliveryTime: 'Next day' },
      { name: 'Sainsbury\'s', price: 3.55, availability: 'limited', rating: 4.4, deliveryTime: 'Next day' },
      { name: 'Morrisons', price: 3.70, availability: 'in-stock', rating: 4.3, deliveryTime: '2-3 days' },
    ]
  }
];

export const mockRetailers: Retailer[] = [
  {
    id: '1',
    name: 'Royal Bee',
    logo: '🐝',
    description: 'Your local supermarket with unbeatable prices',
    rating: 4.5,
    deliveryOptions: ['Same day delivery', 'Click & Collect', 'Standard delivery']
  },
  {
    id: '2',
    name: 'Tesco',
    logo: '🏪',
    description: 'Every little helps - quality products at great prices',
    rating: 4.3,
    deliveryOptions: ['Next day delivery', 'Click & Collect', 'Express delivery']
  },
  {
    id: '3',
    name: 'Sainsbury\'s',
    logo: '🛍️',
    description: 'Quality ingredients, carefully sourced',
    rating: 4.2,
    deliveryOptions: ['Next day delivery', 'Click & Collect', 'Scheduled delivery']
  },
  {
    id: '4',
    name: 'Morrisons',
    logo: '🏬',
    description: 'Fresh food specialists with local sourcing',
    rating: 4.1,
    deliveryOptions: ['2-3 day delivery', 'Click & Collect', 'Weekend delivery']
  }
];

export const companyInfo = {
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

export const sustainabilityData = {
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