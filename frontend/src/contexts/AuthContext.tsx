import { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
// @ts-ignore - BrowserProvider is available in ethers v6+
declare const window: any;

type User = {
  address: string | null;
  isConnected: boolean;
  fitnessData: any;
};

type AuthContextType = {
  user: User;
  connectWallet: () => Promise<void>;
  disconnect: () => void;
  connectFitnessTracker: (provider: string) => Promise<void>;
};

const defaultUser: User = {
  address: null,
  isConnected: false,
  fitnessData: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : defaultUser;
  });

  useEffect(() => {
    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          setUser(prev => ({
            ...prev,
            address: accounts[0],
            isConnected: true
          }));
        }
      }
    };

    checkWalletConnection();

    // Listen for account changes
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // Disconnected
        setUser(defaultUser);
      } else {
        setUser(prev => ({
          ...prev,
          address: accounts[0],
          isConnected: true
        }));
      }
    };

    window.ethereum?.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    // Save user to localStorage when it changes
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        window.open('https://metamask.io/download.html', '_blank');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      
      setUser({
        ...user,
        address: accounts[0],
        isConnected: true
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const disconnect = () => {
    setUser(defaultUser);
  };

  const connectFitnessTracker = async (provider: string) => {
    // Mock implementation - replace with actual OAuth flow
    console.log(`Connecting to ${provider}...`);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        setUser(prev => ({
          ...prev,
          fitnessData: {
            provider,
            steps: Math.floor(Math.random() * 10000),
            calories: Math.floor(Math.random() * 2000),
            activeMinutes: Math.floor(Math.random() * 120)
          }
        }));
        resolve();
      }, 1500);
    });
  };

  return (
    <AuthContext.Provider value={{ user, connectWallet, disconnect, connectFitnessTracker }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
