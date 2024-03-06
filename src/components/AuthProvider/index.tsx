import { createContext, useContext, useMemo, useState } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext(null);

const AuthProvider = ({ children }: any) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(Cookies.get("auth_token"));

  // Function to set the authentication token
  const setToken = (newToken: any) => {
    setToken_(newToken);
  };

  // Memoized value of the authentication context
  const contextValue: any = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
