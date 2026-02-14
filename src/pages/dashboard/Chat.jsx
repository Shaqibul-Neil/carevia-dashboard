import React, { useEffect, useState } from "react";
import BeforeJoinRoom from "../../components/dashboard/chat/BeforeJoinRoom";
import ChatUI from "../../components/dashboard/chat/ChatUI";
import { io } from "socket.io-client";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

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

  const axiosSecure = useAxiosSecure();

  const fetchUsers = async () => {
    try {
      const res = await axiosSecure.get("/api/chat/user/booking");
      setParticipants(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // === useEffect #1: Initial fetch ===
  useEffect(() => {
    fetchUsers();
  }, []);

  // === useEffect #2: Real-time updates (NEW - ADD THIS) ===
  useEffect(() => {
    // Listen for new customers
    socket.on("customer_added", (newCustomer) => {
      console.log("New customer added:", newCustomer);
      //Add to participants list
      setParticipants((prev) => {
        const exists = prev.find((p) => p._id === newCustomer.userId);
        if (exists) return prev;
        // New user - REFETCH from API to get complete data
        fetchUsers(); // Call fetch function
        return prev; // Return current, fetch will update
      });
      //show toast
    });
    return () => socket.off("customer_added");
  }, []);

  // === useEffect #3: Socket Connection& Chat room logic ===

  useEffect(() => {
    if (isJoined && userName && roomId) {
      console.log("🔌 Attempting to connect socket...");
      // // Remove old listeners before adding new ones
      // socket.off("connect");
      // socket.off("disconnect");
      // socket.off("receive_message");

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

  console.log(participants);
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
