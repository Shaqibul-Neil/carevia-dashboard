import { MoreVertical, Search } from "lucide-react";

const ChatSidebar = ({ chatInfos }) => {
  const {
    userName,
    roomId,
    isSidebarOpen,
    setIsSidebarOpen,
    participants,
    selectedChat,
    setSelectedChat,
  } = chatInfos;

  return (
    <div
      className={`${
        isSidebarOpen ? "translate-x-0" : "-translate-x-500 absolute z-20"
      } md:relative md:translate-x-0 w-full md:w-80 lg:w-96 border-r border-border bg-card flex flex-col transition-transform duration-300 h-full`}
    >
      {/* Sidebar Header */}
      <div className="px-4 h-16 border-b border-border flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Messages</h2>
          <div className="flex gap-1 items-center">
            <p className="text-muted-foreground text-sm">
              Room: {roomId}({userName})
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <button className="p-2 hover:bg-muted rounded-xs text-muted-foreground transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      {/* Search Bar */}
      <div className="p-4 pt-4">
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
      <div className="flex-1 overflow-y-auto">
        {participants?.map((contact) => (
          <div
            key={contact.id}
            onClick={() => {
              setSelectedChat(contact);
              setIsSidebarOpen(false);
            }}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-border/40 hover:bg-muted/50 ${selectedChat?.id === contact.id ? "bg-emerald-50 dark:bg-slate-700 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"}`}
          >
            <div className="relative">
              {/* User Image */}
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-xs object-cover border border-border"
              />
              {contact.status === "online" && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-card rounded-xs"></span>
              )}
            </div>
            {/* User name and message */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <h3
                  className={`font-medium text-sm text-foreground whitespace-nowrap ${selectedChat?.id === contact?.id ? "text-primary" : "text-foreground"} transition-all duration-500`}
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
                  <span className="flex items-center justify-center min-w-4 h-4 px-1.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-xs">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
