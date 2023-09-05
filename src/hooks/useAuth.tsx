import Cookie from 'js-cookie'
import { createContext, useContext, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
}

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: Props) {
  const auth = useProviderAuth();
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

function useProviderAuth() {
  const [token, setToken] = useState<string | null >(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  useEffect(() => {
    const token = Cookie.get('token');
    if(token) {
      setToken(token);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token: string) => {
    Cookie.set('token', token, { expires: 1,sameSite: 'Strict' });
    setToken(token);
    setIsAuthenticated(true);
  } 

  const logout = () => {
    Cookie.remove('token');
    setToken(null);
    setIsAuthenticated(false);
  };
  
  return {
    token,
    login,
    logout,
    isAuthenticated
  }
}

export const useAuth = () => {
  return useContext(AuthContext);
}