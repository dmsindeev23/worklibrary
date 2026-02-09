import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_PURCHASE'; payload: string }
  | { type: 'UPDATE_PROGRESS'; payload: { moduleId: string; progress: number } }
  | { type: 'SET_SUBSCRIPTION'; payload: User['subscription'] };

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  addPurchase: (moduleId: string) => void;
  updateProgress: (moduleId: string, progress: number) => void;
  hasPurchased: (moduleId: string) => boolean;
  hasSubscription: () => boolean;
  setSubscription: (subscription: User['subscription']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo user for development
const demoUser: User = {
  id: 'user-001',
  email: 'demo@curatedlibrary.com',
  name: 'Алекс Демо',
  purchasedModules: ['mod-002', 'mod-005', 'mod-007'],
  moduleProgress: {
    'mod-002': 75,
    'mod-005': 30,
    'mod-007': 100,
  },
  subscription: {
    id: 'sub-001',
    plan: 'monthly',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
    status: 'active',
  },
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'ADD_PURCHASE':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          purchasedModules: [...state.user.purchasedModules, action.payload],
        },
      };
    case 'UPDATE_PROGRESS':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          moduleProgress: {
            ...state.user.moduleProgress,
            [action.payload.moduleId]: action.payload.progress,
          },
        },
      };
    case 'SET_SUBSCRIPTION':
      if (!state.user) return state;
      return {
        ...state,
        user: {
          ...state.user,
          subscription: action.payload,
        },
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: demoUser, // Auto-login for demo
    isAuthenticated: true,
  });

  const login = useCallback((email: string, name: string) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name,
      purchasedModules: [],
      moduleProgress: {},
    };
    dispatch({ type: 'LOGIN', payload: newUser });
  }, []);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, []);

  const addPurchase = useCallback((moduleId: string) => {
    dispatch({ type: 'ADD_PURCHASE', payload: moduleId });
  }, []);

  const updateProgress = useCallback((moduleId: string, progress: number) => {
    dispatch({ type: 'UPDATE_PROGRESS', payload: { moduleId, progress } });
  }, []);

  const hasPurchased = useCallback((moduleId: string) => {
    return state.user?.purchasedModules.includes(moduleId) ?? false;
  }, [state.user]);

  const hasSubscription = useCallback(() => {
    return state.user?.subscription?.status === 'active' || false;
  }, [state.user]);

  const setSubscription = useCallback((subscription: User['subscription']) => {
    dispatch({ type: 'SET_SUBSCRIPTION', payload: subscription });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        login,
        logout,
        addPurchase,
        updateProgress,
        hasPurchased,
        hasSubscription,
        setSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
