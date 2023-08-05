import Cookie from 'js-cookie'
import { createContext, useContext, useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
}

type AuthContextType = {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
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
  useEffect(() => {
    const token = Cookie.get('token');
    if(token) {
      setToken(token);
    }
  }, []);

  const login = (token: string) => {
    Cookie.set('token', token, { expires: 1,sameSite: 'Strict' });
    setToken(token);
  } 

  const logout = () => {
    Cookie.remove('token');
    setToken(null);
  };
  
  return {
    token,
    login,
    logout
  }
}

export const useAuth = () => {
  return useContext(AuthContext);
}