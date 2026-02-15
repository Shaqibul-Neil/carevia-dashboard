import React, { useEffect, useState } from "react";
import ChatUI from "../../components/dashboard/chat/ChatUI";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { showSuccessToast, showErrorToast } from "../../lib/utils";
import useAuth from "../../hooks/useAuth";
import carevia from "../../../public/carevia.png";
import useSocket from "../../hooks/useSocket";

const Chat = () => {
  const { user } = useAuth();
  const socket = useSocket();
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
          console.log("admin data fetched-----", res);
          setParticipants(res?.data?.data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    if (user) fetchUsers();
  }, [user, axiosSecure]);

  // === useEffect #2: Real-time updates () ===
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
  }, [axiosSecure, user?.role]);

  // === useEffect #3: Socket Connection & Chat room logic ===

  useEffect(() => {
    if (!socket) {
      return;
    }
    if (roomId) {
      console.log(`🔌 Joining room: ${roomId}`);
      socket.emit("join_room", roomId);
    }

    //after sending message socket returns a receive message event catch it and save it in state
    const onReceiveMessage = (data) => {
      //check if the message is this for room
      if (data.roomId !== roomId) return;
      console.log("📩 Message Received:", data);

      // //check if the message is from me, if yes then ignore because Optimistic ui already added it--if we use io.to in the backend then we'll need this code. but we use socket.to so we don't need it
      // if (data.senderId === userName) {
      //   return;
      // }
      setMessages((prev) => [...prev, data]);
    };

    //adding the listener
    socket.on("receive_message", onReceiveMessage);

    //clean up function
    return () => {
      socket.off("receive_message", onReceiveMessage);
    };
  }, [roomId, userName, socket]);

  const handleChatSelect = (participant) => {
    setSelectedChat(participant);
    setIsSidebarOpen(false);
    user?.role === "admin" ? setRoomId(participant._id) : setRoomId(user._id);
  };

  //check if socket is ready
  const isSocketReady = !!(socket && socket.connected);

  const chatInfos = {
    roomId,
    setRoomId,
    messages,
    userName,
    currentUser: user,
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
    isConnected: isSocketReady,
    socket, // Pass socket instance
  };

  return (
    <div className="h-[calc(100vh-6rem)]">
      <ChatUI chatInfos={chatInfos} />
    </div>
  );
};

export default Chat;
