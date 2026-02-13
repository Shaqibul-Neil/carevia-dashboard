import React, { useState } from "react";
import MainChatBox from "./MainChatBox";
import ChatSidebar from "./ChatSidebar";
// Dummy Data for Contacts
const contacts = [
  {},

  // {
  //   id: 5,
  //   name: "Evan Wright",
  //   avatar: "https://i.pravatar.cc/150?u=5",
  //   status: "offline",
  //   lastMessage: "Sounds good.",
  //   time: "Mon",
  //   unread: 0,
  // },
];

// Dummy Data for Messages
const chatMessages = [
  {
    // id: 1,
    // senderId: 2, // Bob
    // text: "Hey, how is the dashboard coming along?",
    // time: "09:41 AM",
    // status: "read",
  },
];
const ChatUI = ({ chatInfos }) => {
  // // === Event Handlers ===
  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.myMessage.value);
  // };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-card border border-border rounded-xs overflow-hidden shadow-sm">
      {/* Chat Sidebar */}
      <ChatSidebar chatInfos={chatInfos} />
      {/* Main Chat Area */}
      <MainChatBox chatInfos={chatInfos} />
    </div>
  );
};

export default ChatUI;
