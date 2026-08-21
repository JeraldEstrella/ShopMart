import { supabase } from '../config/Supabase';
import type { User, Session } from '@supabase/supabase-js';

export interface AuthResponse {
  user: User | null;
  session: Session | null;
}

export type AuthProvider = 'google' | 'facebook';

export interface AuthCredentials {
  email: string;
  password: string;
}

class AuthService {
  async storeToken(session: Session | null) {
    if (!session) {
      throw new Error('No user logged in');
    }

    const response = await fetch('http://localhost:8080/api/auth/me', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to store authentication');
    }

    return response.json();
  }

  async signInWithEmail({ email, password }: AuthCredentials) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  async signUpWithEmail({ email, password }: AuthCredentials) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data;
  }

  async signInWithProvider(provider: AuthProvider) {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider,
    });

    if (error) throw error;

    return data;
  }
}

export default new AuthService();
