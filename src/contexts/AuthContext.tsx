import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import type { User as AppUser } from '@/types';
import { supabase } from '@/lib/supabaseClient';

// --- Access model ---
export type EntitlementType = 'single' | 'subscription';

export interface Entitlement {
  id: string;
  user_id: string;
  module_id: string | null; // null when it's a subscription entitlement
  type: EntitlementType;
  expires_at: string | null;
  created_at?: string;
}

interface AuthContextType {
  user: AppUser | null;
  isAuthenticated: boolean;
  isAuthReady: boolean;

  // Auth
  signInWithMagicLink: (email: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => Promise<void>;

  // Access
  entitlements: Entitlement[];
  refreshEntitlements: () => Promise<void>;
  hasPurchased: (moduleId: string) => boolean;
  hasSubscription: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toAppUser(supabaseUser: any): AppUser {
  const email: string = supabaseUser?.email ?? '';
  const nameFromMeta = supabaseUser?.user_metadata?.full_name;
  const fallbackName = email ? email.split('@')[0] : 'Пользователь';

  return {
    id: supabaseUser.id,
    email,
    name: nameFromMeta || fallbackName,
    purchasedModules: [],
    moduleProgress: {},
  };
}

function isNotExpired(expiresAt: string | null): boolean {
  if (!expiresAt) return true;
  return new Date(expiresAt).getTime() > Date.now();
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [entitlements, setEntitlements] = useState<Entitlement[]>([]);

  const isAuthenticated = !!user;

  const refreshEntitlements = useCallback(async () => {
    if (!user) {
      setEntitlements([]);
      return;
    }

    const { data, error } = await supabase
      .from('entitlements')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      // eslint-disable-next-line no-console
      console.warn('[Supabase] entitlements fetch error:', error.message);
      return;
    }

    setEntitlements((data as Entitlement[]) ?? []);
  }, [user]);

  // Bootstrap auth session
  useEffect(() => {
    let mounted = true;

    (async () => {
      const { data } = await supabase.auth.getSession();
      const sessionUser = data.session?.user;

      if (!mounted) return;

      if (sessionUser) {
        const appUser = toAppUser(sessionUser);
        setUser(appUser);
      } else {
        setUser(null);
      }

      setIsAuthReady(true);
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user;
      if (sessionUser) {
        setUser(toAppUser(sessionUser));
      } else {
        setUser(null);
        setEntitlements([]);
      }
      setIsAuthReady(true);
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  // Load entitlements after login
  useEffect(() => {
    if (!isAuthReady) return;
    if (!user) return;
    void refreshEntitlements();
  }, [isAuthReady, user, refreshEntitlements]);

  const signInWithMagicLink = useCallback(async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail) return { ok: false as const, error: 'Введите email' };

    // IMPORTANT: Redirect back to your site.
    // Works for both local + prod; Supabase must allow these URLs in Auth settings.
    const redirectTo = window.location.origin + '/#/dashboard';

    const { error } = await supabase.auth.signInWithOtp({
      email: cleanEmail,
      options: { emailRedirectTo: redirectTo },
    });

    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  }, []);

  const logout = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  const hasPurchased = useCallback(
    (moduleId: string) => {
      return entitlements.some(
        (e) => e.type === 'single' && e.module_id === moduleId && isNotExpired(e.expires_at)
      );
    },
    [entitlements]
  );

  const hasSubscription = useCallback(() => {
    return entitlements.some((e) => e.type === 'subscription' && isNotExpired(e.expires_at));
  }, [entitlements]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isAuthenticated,
      isAuthReady,
      signInWithMagicLink,
      logout,
      entitlements,
      refreshEntitlements,
      hasPurchased,
      hasSubscription,
    }),
    [
      user,
      isAuthenticated,
      isAuthReady,
      signInWithMagicLink,
      logout,
      entitlements,
      refreshEntitlements,
      hasPurchased,
      hasSubscription,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
