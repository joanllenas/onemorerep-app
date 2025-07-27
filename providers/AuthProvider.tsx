import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

const FAKE_TOKEN_KEY = 'fake_auth_token';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadAuthState = async () => {
      try {
        const token = await AsyncStorage.getItem(FAKE_TOKEN_KEY);
        setIsAuthenticated(!!token);
      } catch (error) {
        // TODO: handle error
        console.error('Failed to load auth state:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthState();
  }, []);

  const signIn = async () => {
    // TODO: implement sign-in logic
    await AsyncStorage.setItem(FAKE_TOKEN_KEY, 'dummy_token');
    setIsAuthenticated(true);
  };

  const signOut = async () => {
    // TODO: implement sign-out logic
    await AsyncStorage.removeItem(FAKE_TOKEN_KEY);
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, loading }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
