import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { io } from "socket.io-client";
import SocketContext from "./SocketContext";
//Socket.IO config

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
console.log("🔌 Attempting to connect to Socket URL:", SOCKET_URL);

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, loading } = useAuth();

  //
  useEffect(() => {
    //if no user then disconnect socket
    if (!user || loading) {
      if (socket) {
        console.log("❌ Desconnecting Socket (User logged out or invalid)");
        socket.disconnect();
        setSocket(null);
      }
      return;
    }
    //if socket then no need create a new one
    //if user is logged in and no socket then connect socket(Background connection)
    if (socket?.connected) return;
    console.log("🔌 Initializing Global Socket...");
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"],
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      query: { userId: user._id },
    });
    setSocket(newSocket);

    //connection event
    newSocket.on("connect", () => {
      console.log("✅ Global Socket Connected:", newSocket.id);
    });

    newSocket.on("disconnect", () => {
      console.log("❌ Global Socket Disconnected");
    });
    //clean up
    //only disconnect when the component unmounts
    //we don't want socket to be disconnected so we wont disconnect it
    //if the user is null then it will disconnect
    return () => {
      // newSocket.disconnect();
    };
  }, [user, loading]); //if only user changes run it. if we add socket here the it can create a infinite loop for every rerender
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketProvider;
