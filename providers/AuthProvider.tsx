import { account } from '@/utils/app-write';
import { sleep } from '@/utils/debug';
import React from 'react';
import { AppState } from 'react-native';
import { Models } from 'react-native-appwrite';

interface AuthContextType {
  loggedInUser: Models.User<Models.Preferences> | null;
  checkingInitialUser: boolean;
  loading: boolean;
  signIn: (email: string) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetAll: () => void;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = React.useState<Models.User<Models.Preferences> | null>(null);
  const [checkingInitialUser, setCheckingInitialUser] = React.useState(true);
  const [loading, setLoading] = React.useState(true);
  const [otpUserId, setOtpUserId] = React.useState('');

  // Get Logged In user
  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await account.get();
        setLoggedInUser(user);
      } catch {
        setLoggedInUser(null);
      } finally {
        setCheckingInitialUser(false);
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // When app is focused, check user again
  React.useEffect(() => {
    const subscription = AppState.addEventListener('change', async (nextAppState) => {
      if (nextAppState === 'active') {
        setLoading(true);
        try {
          const user = await account.get();
          setLoggedInUser(user);
        } catch {
          setLoggedInUser(null);
        } finally {
          setLoading(false);
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const resetAll = () => {
    setOtpUserId('');
    setLoggedInUser(null);
    setLoading(false);
  };

  const signIn = async (email: string) => {
    resetAll();
    setLoading(true);
    await sleep(1000);

    // const token = await account.createEmailToken(ID.unique(), email);
    // setOtpUserId(token.userId);
    setLoading(false);
  };

  const verifyOtp = async (code: string) => {
    setLoading(true);
    await sleep(3000);
    //await account.createSession(otpUserId, code);
    //setLoggedInUser(await account.get());
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    await account.deleteSessions();
    resetAll();
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, checkingInitialUser, loading, resetAll, signIn, verifyOtp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
