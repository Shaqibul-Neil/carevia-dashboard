import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const authInfo = useContext(AuthContext);
  if (!authInfo) throw new Error("Unauthorized access");
  return authInfo;
};
export default useAuth;
