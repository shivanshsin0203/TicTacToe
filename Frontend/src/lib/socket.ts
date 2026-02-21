import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

export function useSocket(token: string) {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!token) return;

    socketRef.current = io("http://localhost:3001", {
      
      transports: ["websocket"],
    });

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, [token]);

  return socketRef;
}