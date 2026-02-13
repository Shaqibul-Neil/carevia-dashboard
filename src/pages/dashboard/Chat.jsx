import React, { useEffect, useState } from "react";
import BeforeJoinRoom from "../../components/dashboard/chat/BeforeJoinRoom";
import ChatUI from "../../components/dashboard/chat/ChatUI";
import { io } from "socket.io-client";

//Socket.IO config
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let socket = io.connect(SOCKET_URL);

const Chat = () => {
  // === Join State ===
  const [isJoined, setIsJoined] = useState(false);
  const [userName, setUserName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [tempUserName, setTempUserName] = useState("");
  const [tempRoomId, setTempRoomId] = useState("");

  // === Chat States ===
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [participants, setParticipants] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // === Socket Connection Logic ===
  useEffect(() => {
    console.log(socket);
    if (isJoined && userName && roomId) {
      console.log("🔌 Attempting to connect socket...");
      // Remove old listeners before adding new ones
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");

      //socket connection events
      socket.on("connect", () => {
        console.log("✅ Socket connected!");
        setIsConnected(true);
        //informing socket about joining room after connection
        socket.emit("join_room", roomId);
      });

      socket.on("disconnect", () => {
        console.log("❌ Socket disconnected!");
        setIsConnected(false);
      });

      //after sending message socket returns a receive message event catch it and save it in state
      socket.on("receive_message", (data) => {
        console.log("💬 Message received:", data);
        setMessages((prev) => [...prev, data]);
      });

      //check if already connected
      if (socket.connected) {
        console.log("✅ Socket already connected!");
        setIsConnected(true);
        socket.emit("join_room", roomId);
      }
    }

    //clean up function
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receive_message");
    };
  }, [roomId, userName, isJoined]);

  const chatInfos = {
    tempUserName,
    setTempUserName,
    tempRoomId,
    setTempRoomId,
    isJoined,
    setIsJoined,
    userName,
    setUserName,
    roomId,
    setRoomId,
    messages,
    selectedChat,
    setSelectedChat,
    isSidebarOpen,
    setIsSidebarOpen,
    setMessages,
    messageInput,
    setMessageInput,
    participants,
    setParticipants,
    isConnected,
    setIsConnected,
    socket, // Pass socket instance
  };

  return (
    <div className="h-[calc(100vh-6rem)]">
      {!isJoined ? (
        <BeforeJoinRoom chatInfos={chatInfos} />
      ) : (
        <ChatUI chatInfos={chatInfos} />
      )}
    </div>
  );
};

export default Chat;
