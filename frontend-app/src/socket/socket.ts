import { io, Socket } from "socket.io-client";
// import { useAuthStore } from "@store/auth.store";

let socket: Socket | null = null;

export const createSocket = () => {
  if (!socket) {
    // const token = useAuthStore.getState().accessToken;

    socket = io(import.meta.env.VITE_SOCKET_URL, {
      // auth: {
      //   token,
      // },
      withCredentials: true,
    });
  }

  return socket;
};
