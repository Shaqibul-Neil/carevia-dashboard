# 🚨 Socket System Troubleshooting & Error Log

This document serves as a comprehensive troubleshooting guide for the Carevia Chat Application. It details every significant error encountered during development, the debugging process, and the final solution.

---

## 1. 🔄 Connection & Lifecycle Errors

### **1.1 Page Reload Crash ("Failed to connect Socket")**
*   **Error:** App crashes or shows 404/Error Boundary when refreshing `Chat.jsx`.
*   **Why it happened:** The `useSocket()` hook tried to access `socket` immediately on render. Since socket connection is asynchronous, `socket` was `null` for the first few milliseconds after reload.
*   **Solution:**
    1.  Modified `useSocket` to return `null` instead of throwing an error.
    2.  Added a **Loading Guard** in `Chat.jsx`: `if (!socket) return <Loading />`. This forces React to wait until the connection is established before rendering the chat logic.
*   **Code:**
    ```javascript
    // Chat.jsx
    if (!socket && user) return <LoadingSpinner />;
    ```

### **1.2 "React Hook is called conditionally"**
*   **Error:** Console error: `Rendered more hooks than during the previous render`.
*   **Why it happened:** We placed the loading guard (`if (!socket) return...`) *before* our `useEffect` hooks. React relies on the exact same order of hooks every render. Early returns break this chain.
*   **Solution:** Moved all `useState`, `useEffect`, and custom hooks to the top of the component. Placed the conditional return at the very **bottom**, just before the JSX return.

### **1.3 Infinite Reconnection Loop / Multiple Sockets**
*   **Error:** Connecting multiple times or creating new socket instances on every re-render.
*   **Why it happened:** Initializing `io()` directly inside a component without `useEffect` or inside a component that re-renders frequently.
*   **Solution:** Moved socket initialization to a `SocketProvider` with a strict `useEffect` dependency array `[user]`. Added `if (socket?.connected) return` to prevent duplicate connections.

---

## 2. 📨 Messaging & Logic Errors

### **2.1 Double Messages (Ghost Messages)**
*   **Error:** Sender sees their own message appear twice.
*   **Why it happened:**
    1.  **Optimistic UI:** We added the message to the local state immediately (Message 1).
    2.  **Server Broadcast:** Server used `io.to(room).emit()`, sending it back to everyone *including* the sender (Message 2).
*   **Solution:**
    *   **Server Side:** Changed to `socket.to(room).emit()`. This broadcasts to everyone *except* the sender.
    *   **Client Side:** Added `senderId` checks to ensure incoming messages aren't from `currentUser`.

### **2.2 "Broadcasting to All" (Privacy Leak)**
*   **Error:** Messages sent in one room were visible in other rooms or to all users.
*   **Why it happened:**
    *   The frontend client was listening to *all* `receive_message` events globally.
    *   We weren't filtering incoming data based on the active `roomId`.
*   **Solution:**
    *   **Filter Logic:** Inside `socket.on("receive_message")`, added:
        ```javascript
        if (data.roomId !== roomId) return;
        ```
    *   **UI Logic:** Filtered the messages array before mapping:
        ```javascript
        const roomMessages = messages.filter(m => m.roomId === activeRoomId);
        ```

### **2.3 Duplicate Participants in List**
*   **Error:** If a user booked multiple times, they appeared multiple times in the Admin's chat list.
*   **Why it happened:** The API returned raw booking data, which contains one entry per transaction.
*   **Solution:** Used a `Map` (Data Structure) to filter unique users by `_id`.
    *   *Why Map?* A `Map` preserves key insertion order and has faster lookup time `O(1)` compared to nested arrays/filtering `O(n^2)`.
*   **Code:**
    ```javascript
    const uniqueMap = new Map();
    for (const user of allUsers) {
      // Overwrites existing entry if _id matches, keeping only unique users
      uniqueMap.set(user._id, user); 
    }
    setParticipants(Array.from(uniqueMap.values()));
    ```

---

## 3. 🌐 Network & Deployment Errors

### **3.1 Socket Not Connecting in Production**
*   **Error:** Works locally, but "Connection Failed" on Railway/Vercel.
*   **Why it happened:**
    *   **Mixed Content:** HTTPS site trying to connect to insecure WS (HTTP).
    *   **Cold Start:** Free tier servers on Railway go to sleep. Initial connection times out.
*   **Solution:**
    1.   Ensured `SOCKET_URL` uses `https://` or `wss://`.
    2.  Added `reconnection: true` and `reconnectionAttempts: 5` in `SocketProvider` to handle server wake-up times automatically.

### **3.2 "Connecting..." Stuck Forever**
*   **Error:** User navigates to chat, sees spinner, but it never connects.
*   **Why it happened:** The `Chat.jsx` logic was responsible for connecting. If the user navigated away, connection broke.
*   **Solution:** **Background Connection Strategy.**
    *   Moved connection logic to `main.jsx` (Global Provider).
    *   Socket connects immediately upon **Login**, not just when opening Chat.
    *   This ensures the socket is "warm" and ready instantly when the user visits the chat page.
