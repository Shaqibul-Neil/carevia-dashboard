import { Users } from "lucide-react";
import React from "react";
import Button from "../../shared/button/Button";

const BeforeJoinRoom = ({ chatInfos }) => {
  const {
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
  } = chatInfos;

  // === Event Handlers ===
  const handleJoinRoom = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (!tempUserName.trim() || !tempRoomId.trim()) {
      alert("Please enter both username and room ID");
      return;
    }
    setUserName(tempUserName.trim());
    setRoomId(tempRoomId.trim());
    setIsJoined(true);
  };

  return (
    <>
      <div className="w-full max-w-md p-8 bg-card border border-border rounded-xs shadow-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users size={40} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Join Chat Room
          </h2>
          <p className="text-sm text-muted-foreground">
            Enter your details to start chatting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleJoinRoom} className="space-y-5">
          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Your Name
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={tempUserName}
              onChange={(e) => setTempUserName(e.target.value)}
              placeholder="e.g., John Doe"
              className="w-full px-4 py-2.5 bg-muted/50 border border-input rounded-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
            />
          </div>

          {/* Room ID Input */}
          <div>
            <label
              htmlFor="roomId"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Room ID
            </label>
            <input
              type="text"
              name="roomId"
              id="roomId"
              value={tempRoomId}
              onChange={(e) => setTempRoomId(e.target.value)}
              placeholder="e.g., support-room-123"
              className="w-full px-4 py-2.5 bg-muted/50 border border-input rounded-xs focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder:text-muted-foreground transition-all"
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              Use the same Room ID to connect with others
            </p>
          </div>

          {/* Join Button */}
          <Button type="submit" className={"w-full py-3 justify-center"}>
            {" "}
            Join Chat Room
          </Button>
        </form>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-muted/30 border border-border rounded-xs">
          <p className="text-xs text-muted-foreground text-center">
            💡 Both users must use the{" "}
            <span className="font-semibold text-foreground">same Room ID</span>{" "}
            to connect
          </p>
        </div>

        {/* Debug Info (temporary - remove later) */}
        <div className="mt-4 p-3 bg-muted/20 rounded-xs">
          <p className="text-xs text-muted-foreground">
            Debug: isJoined = {isJoined ? "true" : "false"}
          </p>
          <p className="text-xs text-muted-foreground">
            Username: {userName || "not set"}
          </p>
          <p className="text-xs text-muted-foreground">
            Room: {roomId || "not set"}
          </p>
        </div>
      </div>
    </>
  );
};

export default BeforeJoinRoom;
