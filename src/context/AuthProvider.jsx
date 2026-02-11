import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  //States to share user info and token
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  //load data form local storage when component mounts
  useEffect(() => {
    const storedToken = localStorage.getItem("access-token");
    const storedUser = localStorage.getItem("user-info");
    if (storedToken && storedUser) {
      //set in the state
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    //loading complete
    setLoading(false);
  }, []); //empty dependency as it will run only once in initial mount

  //2. Create login function and save token and user
  const login = (token, userInfo) => {
    //save in ls to persist refresh
    localStorage.setItem("access-token", token);
    localStorage.setItem("user-info", JSON.stringify(userInfo));

    //update state(immediate ui update)
    setToken(token);
    setUser(userInfo);
  };

  //3. Logout function
  const logout = () => {
    //console.log("logged out");
    //remove items form ls
    localStorage.removeItem("access-token");
    localStorage.removeItem("user-info");
    //clear state
    setToken(null);
    setUser(null);
  };

  //4. Helper function: check if user is authenticated
  const isAuthenticated = () => {
    return !!token; //checking id the token is available, boolean convert
  };
  //4. Helper function: check user role matches
  const hasRole = (role) => {
    return user?.role === role;
  };

  const authInfo = {
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};
export default AuthProvider;
