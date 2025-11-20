import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('beautypc_cart');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('beautypc_cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, quantity) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === productId ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = items.length ? 650 : 0;
    return { subtotal, delivery, total: subtotal + delivery };
  }, [items]);

  const value = {
    items,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    ...totals,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCartContext = () => useContext(CartContext);

