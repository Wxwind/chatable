import { StoreKeyEnum } from '@/constants';
import { queryKeys } from '@/constants/queryKeys';
import { useStorageState } from '@/hooks/useStorageState';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, PropsWithChildren, useContext } from 'react';

interface AuthStore {
  signIn: (token: string) => void;
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
  const queryClient = useQueryClient();

  return (
    <AuthContext.Provider
      value={{
        signIn: (token: string) => {
          setToken(token);
        },
        signOut: () => {
          setToken(null);
          queryClient.invalidateQueries({ queryKey: queryKeys.user() });
        },
        token,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
