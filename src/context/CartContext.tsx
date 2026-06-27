import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Product } from '../interfaces/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, action: 'increment' | 'decrement') => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Funciones de cálculo rápido
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => {
    const price = item.product.price ? parseFloat(item.product.price) : 12.50;
    return acc + price * item.quantity;
  }, 0);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        // Lógica de stock simulada: máximo 5 unidades por producto
        if (prevCart[existingIndex].quantity >= 5) return prevCart;
        const newCart = [...prevCart];
        newCart[existingIndex].quantity += 1;
        return newCart;
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    setIsCartOpen(true); // Abrimos el panel lateral automáticamente al agregar
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, action: 'increment' | 'decrement') => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.product.id === productId) {
          if (action === 'increment') {
            return item.quantity < 5 ? { ...item, quantity: item.quantity + 1 } : item;
          } else {
            return item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item;
          }
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      totalItems, totalPrice, isCartOpen, setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe usarse dentro de un CartProvider');
  return context;
};