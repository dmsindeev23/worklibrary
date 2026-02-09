import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  items: CartItem[];
  addItem: (moduleId: string) => void;
  removeItem: (moduleId: string) => void;
  clearCart: () => void;
  isInCart: (moduleId: string) => boolean;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.moduleId === action.payload);
      if (existingItem) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, { moduleId: action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.moduleId !== action.payload),
      };
    case 'CLEAR_CART':
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = useCallback((moduleId: string) => {
    dispatch({ type: 'ADD_ITEM', payload: moduleId });
  }, []);

  const removeItem = useCallback((moduleId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: moduleId });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const isInCart = useCallback((moduleId: string) => {
    return state.items.some(item => item.moduleId === moduleId);
  }, [state.items]);

  const totalItems = state.items.length;

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
