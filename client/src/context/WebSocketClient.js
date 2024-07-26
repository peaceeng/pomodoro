// In your AuthContext or main App component
import React, { useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext"; // Adjust import as needed

const WebSocketClient = () => {
  const { authToken } = useContext(AuthContext);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000"); // Adjust to your WebSocket server URL

    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "register", token: authToken }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "alert") {
        alert(message.message);
        // Handle session invalidation, e.g., logout user
      }
    };

    return () => ws.close();
  }, [authToken]);

  return null;
};

export default WebSocketClient;
