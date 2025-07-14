
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'user';
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
  }) => Promise<void>;
  googleLogin: () => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('rfp_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo users for testing
    const demoUsers: Record<string, User> = {
      'admin@example.com': {
        id: '1',
        email: 'admin@example.com',
        firstName: 'John',
        lastName: 'Admin',
        company: 'ACME Corp',
        role: 'admin',
        lastLogin: new Date(),
      },
      'manager@example.com': {
        id: '2',
        email: 'manager@example.com',
        firstName: 'Jane',
        lastName: 'Manager',
        company: 'Tech Solutions Inc',
        role: 'manager',
        lastLogin: new Date(),
      },
      'user@example.com': {
        id: '3',
        email: 'user@example.com',
        firstName: 'Bob',
        lastName: 'User',
        company: 'StartupXYZ',
        role: 'user',
        lastLogin: new Date(),
      }
    };

    // Check if user signed up recently - store password with signup data
    const signupData = localStorage.getItem('rfp_signup_data');
    if (signupData) {
      const userData = JSON.parse(signupData);
      console.log('Checking signup data:', userData);
      console.log('Login attempt with:', { email, password });
      
      if (userData.email === email && userData.password === password) {
        const newUser: User = {
          id: userData.id,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          company: userData.company,
          role: 'user',
          lastLogin: new Date(),
        };
        setUser(newUser);
        localStorage.setItem('rfp_user', JSON.stringify(newUser));
        localStorage.removeItem('rfp_signup_data'); // Clean up
        setIsLoading(false);
        return;
      }
    }

    // Check demo users with default password
    const foundUser = demoUsers[email];
    if (foundUser && password === 'password123') {
      const userWithLastLogin = { ...foundUser, lastLogin: new Date() };
      setUser(userWithLastLogin);
      localStorage.setItem('rfp_user', JSON.stringify(userWithLastLogin));
      setIsLoading(false);
      return;
    }
    
    setIsLoading(false);
    throw new Error('Invalid credentials');
  };

  const signup = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    company: string;
  }) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      password: data.password, // Store password for login verification
    };
    
    console.log('Storing signup data:', newUser);
    // Store signup data temporarily for login
    localStorage.setItem('rfp_signup_data', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const googleLogin = async () => {
    setIsLoading(true);
    
    // Simulate Google OAuth
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const googleUser: User = {
      id: 'google_' + Date.now(),
      email: 'google.user@gmail.com',
      firstName: 'Google',
      lastName: 'User',
      company: 'Google Login Test',
      role: 'user',
      lastLogin: new Date(),
    };
    
    setUser(googleUser);
    localStorage.setItem('rfp_user', JSON.stringify(googleUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rfp_user');
    localStorage.removeItem('rfp_signup_data');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    googleLogin,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
