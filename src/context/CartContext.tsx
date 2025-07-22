import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '../data/mockData';

interface CartItem {
  product: Product;
  quantity: number;
  retailer: string;
  price: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, retailer: string, price: number) => void;
  removeFromCart: (productId: string, retailer: string) => void;
  updateQuantity: (productId: string, retailer: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });

  // Persist cart to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, retailer: string, price: number) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(
        item => item.product.id === product.id && item.retailer === retailer
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id && item.retailer === retailer
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { product, quantity: 1, retailer, price }];
    });
  };

  const removeFromCart = (productId: string, retailer: string) => {
    setItems(prevItems => 
      prevItems.filter(item => 
        !(item.product.id === productId && item.retailer === retailer)
      )
    );
  };

  const updateQuantity = (productId: string, retailer: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, retailer);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item =>
        item.product.id === productId && item.retailer === retailer
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
};