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

  // === useEffect #1: Initial fetch ===
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosSecure.get("/api/chat/user/booking");
        setParticipants(res.data.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // === useEffect #2: Real-time updates (NEW - ADD THIS) ===
  useEffect(() => {
    console.log("🎧 Socket listener setup starting...");
    console.log("📡 Socket connected?", socket.connected);
    console.log("🆔 Socket ID:", socket.id);
    // Listen for new customers
    socket.on("customer_added", async (newCustomer) => {
      console.log("🔔 SOCKET EVENT RECEIVED:", newCustomer);
      try {
        // Fetch latest data from API
        console.log("📡 Fetching latest users from API...");
        const res = await axiosSecure.get("/api/chat/user/booking");
        const allUsers = res.data.data;
        console.log("✅ API returned", allUsers.length, "users");

        // Remove duplicates by _id using Map and forOf loop. do not use map/for each to save memory and speed.
        const uniqueMap = new Map();
        for (const user of allUsers) {
          uniqueMap.set(user._id, user);
        }
        const uniqueUsers = Array.from(uniqueMap.values());
        setParticipants(uniqueUsers);
        //show toast
      } catch (error) {
        console.error("❌ Error in socket event handler:", error);
      }
    });
    return () => {
      console.log("🧹 Cleaning up socket listener");
      socket.off("customer_added");
    };
  }, [axiosSecure]);

  // === DEBUG: Socket connection status ===
  useEffect(() => {
    console.log("=== SOCKET DEBUG INFO ===");
    console.log("Socket URL:", SOCKET_URL);
    console.log("Socket connected:", socket.connected);
    console.log("Socket ID:", socket.id);

    if (!socket.connected) {
      console.warn("⚠️ Socket NOT connected! Trying to connect...");
      socket.connect();
    }
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
