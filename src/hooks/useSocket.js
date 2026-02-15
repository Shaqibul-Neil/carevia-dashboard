import { useContext } from "react";
import SocketContext from "../context/SocketContext";

const useSocket = () => {
  const socketInfo = useContext(SocketContext);

  return socketInfo;
};
export default useSocket;
