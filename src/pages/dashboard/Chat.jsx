import { useState } from "react";
import {
  Search,
  MoreVertical,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Image as ImageIcon,
  Mic,
  ArrowLeft,
} from "lucide-react";

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Dummy Data for Contacts
  const contacts = [
    {
      id: 1,
      name: "Alice Freeman",
      avatar: "https://i.pravatar.cc/150?u=1",
      status: "online",
      lastMessage: "Can we schedule a meeting for tomorrow?",
      time: "10:30 AM",
      unread: 2,
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?u=2",
      status: "offline",
      lastMessage: "The project files have been updated.",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 3,
      name: "Charlie Brown",
      avatar: "https://i.pravatar.cc/150?u=3",
      status: "online",
      lastMessage: "Thanks for the help!",
      time: "Yesterday",
      unread: 0,
    },
    {
      id: 4,
      name: "Diana Prince",
      avatar: "https://i.pravatar.cc/150?u=4",
      status: "typing",
      lastMessage: "I'm checking the requirements now...",
      time: "Just now",
      unread: 1,
    },
    {
      id: 5,
      name: "Evan Wright",
      avatar: "https://i.pravatar.cc/150?u=5",
      status: "offline",
      lastMessage: "Sounds good.",
      time: "Mon",
      unread: 0,
    },
  ];

  // Dummy Data for Messages
  const messages = [
    {
      id: 1,
      senderId: 2, // Bob
      text: "Hey, how is the dashboard coming along?",
      time: "09:41 AM",
      status: "read",
    },
    {
      id: 2,
      senderId: 0, // Me
      text: "It's going great! Just finishing up the chat UI.",
      time: "09:42 AM",
      status: "read",
    },
    {
      id: 3,
      senderId: 2, // Bob
      text: "That sounds awesome. Make sure to follow the design system.",
      time: "09:43 AM",
      status: "read",
    },
    {
      id: 4,
      senderId: 0, // Me
      text: "Absolutely. I'm using rounded-xs and the green theme.",
      time: "09:45 AM",
      status: "delivered",
    },
    {
      id: 5,
      senderId: 0, // Me
      text: "Check this out!",
      time: "09:45 AM",
      status: "delivered",
      type: "image",
      content: "https://placehold.co/600x400/22c55e/ffffff?text=Design+Preview",
    },
  ];

  const handleSendMessage = (e) => {
    console.log(e);
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] bg-card border border-border rounded-xs overflow-hidden shadow-sm relative">
      {/* Sidebar - Contacts List */}
      <div
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full absolute z-20"
        } md:relative md:translate-x-0 w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col transition-transform duration-300 h-full`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-muted rounded-xs text-muted-foreground transition-colors">
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="p-4 pt-2">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 bg-muted/50 border border-input rounded-xs focus:outline-none focus:ring-1 focus:ring-primary text-sm transition-all"
            />
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border/40 hover:bg-muted/50 ${
                selectedChat?.id === contact.id
                  ? "bg-primary/5 border-l-4 border-l-primary"
                  : "border-l-4 border-l-transparent"
              }`}
            >
              <div className="relative">
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover border border-border"
                />
                {contact.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-card rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3
                    className={`font-medium text-sm truncate ${selectedChat?.id === contact.id ? "text-primary" : "text-foreground"}`}
                  >
                    {contact.name}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {contact.time}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground truncate pr-2">
                    {contact.status === "typing" ? (
                      <span className="text-primary animate-pulse">
                        Typing...
                      </span>
                    ) : (
                      contact.lastMessage
                    )}
                  </p>
                  {contact.unread > 0 && (
                    <span className="flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                      {contact.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div
        className={`flex-1 flex flex-col h-full bg-muted/30 ${!isSidebarOpen ? "w-full absolute inset-0 z-30 md:static" : "hidden md:flex"}`}
      >
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="h-16 px-6 border-b border-border bg-card flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="md:hidden p-2 -ml-2 hover:bg-muted rounded-xs text-muted-foreground"
                >
                  <ArrowLeft size={20} />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar}
                    alt={selectedChat.name}
                    className="w-10 h-10 rounded-full object-cover border border-border"
                  />
                  {selectedChat.status === "online" && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-full"></span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {selectedChat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {selectedChat.status === "online"
                      ? "Active now"
                      : "Last seen recently"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-2.5 hover:bg-muted rounded-xs text-muted-foreground transition-colors hover:text-primary">
                  <Phone size={20} />
                </button>
                <button className="p-2.5 hover:bg-muted rounded-xs text-muted-foreground transition-colors hover:text-primary">
                  <Video size={20} />
                </button>
                <button className="p-2.5 hover:bg-muted rounded-xs text-muted-foreground transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-[url('https://www.transparenttextures.com/patterns/subtle-light-aluminum.png')] dark:bg-none">
              {/* Date Divider */}
              <div className="flex justify-center">
                <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  Today
                </span>
              </div>

              {messages.map((msg) => {
                const isMe = msg.senderId === 0;
                return (
                  <div
                    key={msg.id}
                    className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[75%] md:max-w-[60%] flex gap-2 ${
                        isMe ? "flex-row-reverse" : "flex-row"
                      }`}
                    >
                      {/* Avatar for receiver */}
                      {!isMe && (
                        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 mt-1">
                          <img
                            src={selectedChat.avatar}
                            alt="Sender"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}

                      <div className={`group relative`}>
                        <div
                          className={`p-3 rounded-2xl shadow-sm text-sm ${
                            isMe
                              ? "bg-primary text-primary-foreground rounded-tr-xs"
                              : "bg-card text-foreground border border-border rounded-tl-xs"
                          }`}
                        >
                          {msg.type === "image" ? (
                            <div className="space-y-2">
                              <img
                                src={msg.content}
                                alt="Shared"
                                className="rounded-lg max-h-60 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                              />
                              <p>{msg.text}</p>
                            </div>
                          ) : (
                            <p className="leading-relaxed">{msg.text}</p>
                          )}
                        </div>

                        {/* Meta info */}
                        <div
                          className={`flex items-center gap-1 mt-1 text-[10px] text-muted-foreground ${isMe ? "justify-end" : "justify-start"}`}
                        >
                          <span>{msg.time}</span>
                          {isMe && (
                            <span>
                              {msg.status === "read" ? (
                                <CheckCheck
                                  size={14}
                                  className="text-primary"
                                />
                              ) : (
                                <Check size={14} />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-card border-t border-border">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2 bg-muted/30 p-2 rounded-xl border border-border focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary transition-all"
              >
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-colors"
                >
                  <Smile size={20} />
                </button>
                <button
                  type="button"
                  className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-colors"
                >
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground px-2"
                />

                {messageInput.trim() ? (
                  <button
                    type="submit"
                    className="p-2 bg-primary text-primary-foreground rounded-lg shadow-md hover:bg-green-600 transition-all transform hover:scale-105 active:scale-95"
                  >
                    <Send size={18} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-muted rounded-full transition-colors"
                  >
                    <Mic size={20} />
                  </button>
                )}
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 dark:bg-black/20">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <ImageIcon size={40} className="text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Carevia Chat
            </h2>
            <p className="text-muted-foreground max-w-sm">
              Select a conversation from the sidebar to start chatting
              comfortably.
            </p>
            <button className="mt-8 px-6 py-2.5 bg-primary text-primary-foreground font-medium rounded-xs shadow-lg shadow-green-500/20 hover:shadow-green-500/30 hover:bg-green-600 transition-all transform hover:-translate-y-0.5">
              Start New Conversation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
