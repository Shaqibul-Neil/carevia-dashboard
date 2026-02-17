# Chat Application Implementation Workflow

This document breaks down every component and decision made during the development of the Carevia Chat Application. It is designed to be a step-by-step guide for future implementations.

---

## 1. 🏗️ High-Level Architecture
**Goal:** Build a scalable, real-time chat system where:
*   Regular Uses talk to a single "Admin/Support" account.
*   Admins manage multiple user conversations.
*   Connections persist across page navigation.

### **The Stack:**
*   **Frontend:** React (Vite) + Socket.io Client
*   **Backend:** Node.js (Socket.io) + Express
*   **Mother App:** Next.js (Auth & Database)

---

## 2. 🔌 Global Socket Provider (`src/context/SocketProvider.jsx`)

**Purpose:** To initialize and manage a single socket connection throughout the app's lifecycle.

### **Line-by-Line Breakdown:**

```javascript
import { io } from "socket.io-client";
// ... imports

const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { user, loading } = useAuth(); // Global Auth Context

  useEffect(() => {
    // 1. Guard Clause: Don't connect if no user or still loading
    if (!user || loading) {
       if (socket) {
         console.log("❌ Desconnecting Socket...");
         socket.disconnect(); // Clean disconnection on logout
         setSocket(null);
       }
       return;
    }

    // 2. Singleton Check: Prevent duplicate connections
    if (socket?.connected) return;

    // 3. Initialization: Create the connection
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket", "polling"], // Try WebSocket first, fallback to polling
      autoConnect: true,
      reconnection: true,        // Auto-retry if connection drops
      reconnectionAttempts: 5,   // Retry 5 times before giving up
      reconnectionDelay: 1000,   // Wait 1s between retries
      query: { userId: user._id }, // Send UserID in handshake (Crucial for server-side mapping)
    });
    
    setSocket(newSocket);

    // 4. Debugging Events
    newSocket.on("connect", () => console.log("✅ Connected:", newSocket.id));
    newSocket.on("disconnect", () => console.log("❌ Disconnected"));

    // 5. Cleanup: Disconnect on component unmount
    return () => {
      // newSocket.disconnect(); // Commented out to keep connection alive during navigation
    };
  }, [user, loading]); // Dependency: Re-run only if user/loading changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
```

---

## 3. 💬 Chat Logic Page (`src/pages/dashboard/Chat.jsx`)

**Purpose:** Managing room state, message history, and incoming events.

### **Line-by-Line Logic:**

1.  **`useSocket()` Hook:** Retrieves the global socket instance.
    *   *Why?* Avoids re-creating connections.

2.  **`roomId` State:**
    *   **User:** Automatically set to their own `user._id`. They only need one room.
    *   **Admin:** Dynamically changes based on the selected user from the sidebar.

3.  **`useEffect` (Initial Fetch):**
    *   **Admin Fetch:** Calls `/api/chat/user/booking`.
    *   **Unique Filtering (Map):** API returns duplicate user entries if they have multiple bookings.
        ```javascript
        const uniqueMap = new Map();
        for (const user of allUsers) {
          uniqueMap.set(user._id, user); // Keeps only the last/unique entry
        }
        ```
        *Why Map?* `O(1)` complexity for updates, ensures unique keys (`_id`), and preserves insertion order. Better than `filter` or `reduce`.

4.  **`useEffect` (Socket Listening):**
    *   **`socket.emit("join_room", roomId)`**: Tells server to subscribe this socket to a specific channel.
    *   **`socket.on("receive_message")`**: Listens for incoming broadcasts.
    *   **Filtering:** `if (data.roomId !== roomId) return;` ensures we don't mix messages from other rooms.
    *   **Cleanup:** `socket.off("receive_message")`. Essential to prevent memory leaks and duplicate listeners when `roomId` changes.

5.  **Loading Guard:**
    *   `if (!socket) return <Loading />`: Ensures React doesn't crash trying to access properties of a null object.

---

## 4. 🖥️ Chat UI Component (`src/components/dashboard/chat/MainChatBox.jsx`)

**Purpose:** Rendering message bubbles and input field.

### **Key Logic:**

1.  **Optimistic UI (Sending):**
    ```javascript
    const handleSendMessage = () => {
      // 1. Update LOCAL state immediately
      setMessages(prev => [...prev, newMessage]);
      // 2. Emit to server
      socket.emit("send_message", ...);
      // 3. Clear Input
      setMessageInput(""); 
    }
    ```
    *Why?* Makes the app feel instantly responsive, even on slow networks.

2.  **"Is Me" Check:**
    ```javascript
    const isMe = msg.senderId === currentUser?._id;
    ```
    *Why?* Using `_id` is unique and secure. Using `name` is unreliable (two "John Doe"s exist).

3.  **`roomMessages` Filter:**
    *   Even if the parent component passes mixed messages, this component strictly filters by `roomId` before rendering.

---

## 5. 🚀 Execution Flow

1.  **App Start:** `SocketProvider` initializes.
2.  **Login:** User authenticates -> Socket connects with `userId` query param.
3.  **Navigation:** User goes to `/dashboard/chat`. Socket is *already connected*.
4.  **Room Join:** `Chat.jsx` emits `join_room`.
5.  **Listen:** Starts listening for `receive_message`.
6.  **Send:** Optimistic update -> Emit `send_message`.
7.  **Receive:** Incoming message -> Filter by Room ID -> Update State.
8.  **Logout:** Socket disconnects.

This workflow ensures reliability, performance, and a seamless user experience.
