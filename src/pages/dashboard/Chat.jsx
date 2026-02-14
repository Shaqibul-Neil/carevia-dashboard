import React, { useEffect, useState } from "react";
import BeforeJoinRoom from "../../components/dashboard/chat/BeforeJoinRoom";
import ChatUI from "../../components/dashboard/chat/ChatUI";
import { io } from "socket.io-client";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showSuccessToast, showErrorToast } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";
import carevia from "../../../public/carevia.png";

//Socket.IO config
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
let socket = io.connect(SOCKET_URL);

const Chat = () => {
  const { user } = useAuth();
  console.log(user);
  const userName = user?.role === "admin" ? "Carevia Admin" : user?.name;

  // === Join State ===

  const [roomId, setRoomId] = useState("");

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
        // --- USER LOGIC ---
        if (user?.role === "user") {
          const adminUser = {
            _id: "admin_carevia",
            firstName: "Carevia",
            lastName: "Support",
            role: "admin",
            status: "online",
            email: "support@carevia.com",
            image: carevia,
            lastLoginAt: new Date().toISOString(),
          };
          setParticipants([adminUser]);
          // Auto-select support chat for user
          // Important: User chats in their OWN room ID
          setRoomId(user?._id);
          setSelectedChat(adminUser);
        } else {
          // --- ADMIN LOGIC ---
          const res = await axiosSecure.get("/api/chat/user/booking");
          setParticipants(res.data.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (user) fetchUsers();
  }, [user, axiosSecure]);

  // === useEffect #2: Real-time updates (NEW - ADD THIS) ===
  useEffect(() => {
    // Listen for new customers
    socket.on("customer_added", async (newCustomer) => {
      try {
        // If regular user, ignore "customer_added"
        if (user?.role === "user") {
          return;
        }
        // ... admin logic ...
        // Fetch latest data from API
        const res = await axiosSecure.get("/api/chat/user/booking");
        const allUsers = res.data.data;
        // Remove duplicates by _id using Map and forOf loop. do not use map/for each to save memory and speed.
        const uniqueMap = new Map();
        for (const user of allUsers) {
          uniqueMap.set(user._id, user);
        }
        const uniqueUsers = Array.from(uniqueMap.values());
        setParticipants(uniqueUsers);
        showSuccessToast("New customer joined");
      } catch (error) {
        console.error("❌ Error in socket event handler:", error);
      }
    });
    return () => {
      socket.off("customer_added");
    };
  }, [axiosSecure]);

  // === useEffect #3: Socket Connection& Chat room logic ===

  useEffect(() => {
    if (roomId) {
      // // Remove old listeners before adding new ones
      // socket.off("connect");
      // socket.off("disconnect");
      // socket.off("receive_message");

      //socket connection events
      socket.on("connect", () => {
        showSuccessToast("Connected to live chat");
        setIsConnected(true);
        //informing socket about joining room after connection
        socket.emit("join_room", roomId);
      });

      socket.on("disconnect", () => {
        showErrorToast("Connection lost. Reconnecting...");
        setIsConnected(false);
      });

      //after sending message socket returns a receive message event catch it and save it in state
      socket.on("receive_message", (data) => {
        setMessages((prev) => [...prev, data]);
      });

      //check if already connected
      if (socket.connected) {
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
  }, [roomId, userName]);

  const handleChatSelect = (participant) => {
    setSelectedChat(participant);
    setIsSidebarOpen(false);
    user?.role === "admin" ? setRoomId(participant._id) : setRoomId(user._id);
  };

  const chatInfos = {
    roomId,
    setRoomId,
    messages,
    userName,
    selectedChat,
    setSelectedChat,
    isSidebarOpen,
    handleChatSelect,
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
      <ChatUI chatInfos={chatInfos} />
    </div>
  );
};

export default Chat;
