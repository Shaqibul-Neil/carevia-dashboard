import { useContext } from "react";
import SocketContext from "../context/SocketContext";

const useSocket = () => {
  const socketInfo = useContext(SocketContext);
  if (!socketInfo) throw new Error("Failed to connect Socket");
  return socketInfo;
};
export default useSocket;
