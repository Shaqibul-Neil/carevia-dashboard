import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext";
//Socket.IO config

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
console.log("🔌 Attempting to connect to Socket URL:", SOCKET_URL);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user } = useAuth();

  //
  useEffect(() => {
    //if no user then disconnect socket
    if (!user) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }
    //if user is logged in and no socket then connect socket(Background connection)
    console.log("🔌 Initializing Global Socket...");
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
    });
    setSocket(newSocket);

    //connection event
    newSocket.on("connect", () => {
      console.log("✅ Global Socket Connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Global Socket Disconnected");
    });
    return () => {
      newSocket.disconnect();
    };
  }, [user]); //if only user changes run it. if we add socket here the it can create a infinite loop for every rerender
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
