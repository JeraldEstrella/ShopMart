import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { queryClient } from '../lib/query.Client';
import { supabase } from '../config/Supabase';
import authService from '../services/auth.service';
import userService from '../services/user.service';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextProps extends AuthState {
  isDarkmode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    isLoading: true,
  });

  const [isDarkmode, setDarkMode] = useState(false);

  useEffect(() => {
    const handleSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        setAuth({
          isAuthenticated: true,
          isLoading: false,
        });

        // Send token to backend and prefetch the userInfo
        if (session) {
          await authService.storeToken(session);

          queryClient.prefetchQuery({
            queryKey: ['user', session.user.id],
            queryFn: () => userService.getUser(session.user.id),
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    handleSession();

    //on signOut or signIn store the token in backend then prefetch the user data
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      try {
        setAuth({
          isAuthenticated: true,
          isLoading: false,
        });

        if ((event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') && session) {
          await authService.storeToken(session);

          queryClient.prefetchQuery({
            queryKey: ['user', session.user.id],
            queryFn: () => userService.getUser(session.user.id),
          });
        }

        if (event === 'SIGNED_OUT') {
          setAuth({
            isAuthenticated: false,
            isLoading: false,
          });

          queryClient.removeQueries({
            queryKey: ['user'],
          });
        }
      } catch (error) {
        console.log(error);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isDarkmode,
        setDarkMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
