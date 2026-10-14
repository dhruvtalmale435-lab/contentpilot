import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, Workspace, UserRole } from '../types';
import { SEED_USER, SEED_ADMIN_USER, SEED_WORKSPACE } from '../services/mockData';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';
import { storage } from '../services/storage';

interface AuthContextType {
  user: UserProfile | null;
  workspace: Workspace;
  isAuthenticated: boolean;
  isDemoMode: boolean;
  isLoading: boolean;
  loginAsDemoCustomer: () => void;
  loginAsDemoAdmin: () => void;
  loginWithEmail: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, pass: string, businessName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateWorkspaceName: (name: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'cp_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? JSON.parse(saved) : SEED_USER; // default to seed user for instant explore
    } catch {
      return SEED_USER;
    }
  });

  const [workspace, setWorkspace] = useState<Workspace>(() => storage.getWorkspace());
  const [isLoading, setIsLoading] = useState(false);

  const isDemoMode = !isSupabaseConfigured || (user?.id.startsWith('usr_demo_') ?? true);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, [user]);

  const loginAsDemoCustomer = () => {
    setUser(SEED_USER);
    setWorkspace(storage.getWorkspace());
  };

  const loginAsDemoAdmin = () => {
    setUser(SEED_ADMIN_USER);
  };

  const loginWithEmail = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error) throw error;
        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: data.user.user_metadata?.full_name || email.split('@')[0],
            role: 'customer',
            currentWorkspaceId: workspace.id
          };
          setUser(newUser);
          setIsLoading(false);
          return { success: true };
        }
      }

      // Demo login
      if (email.toLowerCase().includes('admin')) {
        loginAsDemoAdmin();
      } else {
        const customUser: UserProfile = {
          id: `usr_${Date.now()}`,
          email,
          fullName: email.split('@')[0],
          role: 'customer',
          currentWorkspaceId: workspace.id
        };
        setUser(customUser);
      }
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Authentication failed' };
    }
  };

  const signup = async (email: string, pass: string, businessName: string) => {
    setIsLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password: pass,
          options: { data: { business_name: businessName } }
        });
        if (error) throw error;
        if (data.user) {
          const newUser: UserProfile = {
            id: data.user.id,
            email: data.user.email || email,
            fullName: email.split('@')[0],
            role: 'customer',
            currentWorkspaceId: workspace.id
          };
          setUser(newUser);
        }
      } else {
        const newUser: UserProfile = {
          id: `usr_${Date.now()}`,
          email,
          fullName: email.split('@')[0],
          role: 'customer',
          currentWorkspaceId: workspace.id
        };
        setUser(newUser);
      }

      // Create new workspace
      const updatedWs = storage.updateWorkspace({ name: businessName });
      storage.updateBrandProfile({ businessName });
      setWorkspace(updatedWs);

      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Signup failed' };
    }
  };

  const logout = () => {
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut().catch(() => {});
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateWorkspaceName = (name: string) => {
    const updated = storage.updateWorkspace({ name });
    storage.updateBrandProfile({ businessName: name });
    setWorkspace(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        workspace,
        isAuthenticated: !!user,
        isDemoMode,
        isLoading,
        loginAsDemoCustomer,
        loginAsDemoAdmin,
        loginWithEmail,
        signup,
        logout,
        updateWorkspaceName
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
