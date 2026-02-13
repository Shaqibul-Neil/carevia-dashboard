import {
  ArrowLeft,
  Check,
  CheckCheck,
  ImageIcon,
  Mic,
  MoreVertical,
  Paperclip,
  Phone,
  Send,
  Smile,
  Video,
} from "lucide-react";
import React from "react";
import Button from "../../shared/button/Button";

const MainChatBox = ({ chatInfos }) => {
  const {
    selectedChat,
    isSidebarOpen,
    setIsSidebarOpen,
    messages,
    messageInput,
    setMessageInput,
  } = chatInfos;

  const handleSendMessage = () => {
    console.log(messageInput);
  };
  return (
    <div
      className={`flex-1 flex flex-col h-full bg-emerald-50 dark:bg-slate-600 ${!isSidebarOpen ? "w-full absolute inset-0 z-30 md:static" : "hidden md:flex"}`}
    >
      {selectedChat ? (
        <>
          {/* Chat Header */}
          <div className="h-16 px-6 border-b border-border bg-emerald-50 dark:bg-slate-700 flex items-center justify-between shadow-sm z-10">
            <div className="flex items-center md:gap-3 gap-1">
              <button
                className="md:hidden p-1 -ml-6 hover:bg-muted rounded-xs text-muted-foreground"
                onClick={() => setIsSidebarOpen(true)}
              >
                <ArrowLeft size={20} />
              </button>
              {/* User Image */}
              <div className="relative">
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-xs object-cover border border-border"
                />
                {selectedChat.status === "online" && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-card rounded-xs"></span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground truncate max-w-24 md:max-w-40 lg:max-w-full">
                  {selectedChat.name}
                </h3>
                <p className="text-[10px] md:text-xs text-muted-foreground">
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
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Date Divider */}
            <div className="flex justify-center">
              <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-3 py-1 rounded-xs">
                Today
              </span>
            </div>
            {/* Message body */}
            {messages?.map((msg) => {
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
                      <div className="w-8 h-8 rounded-xs overflow-hidden shrink-0 mt-1">
                        <img
                          src={selectedChat.avatar}
                          alt="Sender"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`group relative`}>
                      {/* Texts */}
                      <div
                        className={`p-3 rounded-xs shadow-sm text-sm ${
                          isMe
                            ? "bg-primary text-primary-foreground rounded-tr-xl"
                            : "bg-card text-foreground border border-border rounded-tl-xl"
                        }`}
                      >
                        <p className="leading-relaxed">{msg.text}</p>
                      </div>

                      {/* Meta info */}
                      <div
                        className={`flex items-center gap-1 mt-1 text-[10px] text-muted-foreground ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        <span>{msg.time}</span>
                        {isMe && (
                          <span>
                            {msg.status === "read" ? (
                              <CheckCheck size={14} className="text-primary" />
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
              className="flex items-center gap-2 bg-muted/30 p-2 rounded-xs border border-border focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary transition-all"
            >
              <Button type="button" variant="secondary" className="p-2">
                <Smile size={20} />
              </Button>

              <Button type="button" variant="secondary" className="p-2">
                <Paperclip size={20} />
              </Button>

              <input
                type="text"
                name="myMessage"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none focus:outline-none text-foreground placeholder:text-muted-foreground px-2"
              />
              {messageInput.trim() ? (
                <Button type="submit" variant="primary" className="p-2 -ml-24">
                  <Send size={18} />
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="secondary"
                  className="p-2 -ml-24"
                >
                  <Mic size={20} />
                </Button>
              )}
            </form>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-gray-50/50 dark:bg-black/20">
          <div className="w-24 h-24 bg-emerald/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <ImageIcon size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to Carevia Chat
          </h2>
          <p className="text-muted-foreground max-w-sm mb-4">
            Select a conversation from the sidebar to start chatting
            comfortably.
          </p>
          <Button className={"px-4 py-2.5"}> Start New Conversation</Button>
        </div>
      )}
    </div>
  );
};

export default MainChatBox;
