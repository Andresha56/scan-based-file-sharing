import { createContext, useContext, useEffect, useRef } from "react";
import { createSocket } from "@socket/socket";
import type { Socket } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {

    if (!socketRef.current) {
      socketRef.current = createSocket();
    }

    return () => {
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used inside SocketProvider");
  }
  return socket;
};
