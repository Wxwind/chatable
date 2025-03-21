import { StoreKeyEnum } from '@/constants';
import { useStorageState } from '@/hooks/useStorageState';
import { authService } from '@/services';
import { LoginDto } from '@/services/data-contracts';
import { createContext, PropsWithChildren, useContext } from 'react';

interface AuthStore {
  signIn: (data: LoginDto) => void;
  signOut: () => void;
  token?: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthStore>({
  signIn: () => null,
  signOut: () => null,
  token: null,
  isLoading: false,
});

export function useAuthContext() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [[isLoading, token], setToken] = useStorageState(StoreKeyEnum.Token);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (data: LoginDto) => {
          const result = await authService.authControllerLogin(data);
          setToken(result.access_token);
        },
        signOut: () => {
          setToken(null);
        },
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
