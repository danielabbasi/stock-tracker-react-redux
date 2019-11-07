import io from "socket.io-client";

const HOST = window.location.hostname;
const PORT = 5000;
const SERVER = `${HOST}:${PORT}`;

const createSocketService = () => {
  let socket: SocketIOClient.Socket;

  function create() {
    return socket || (socket = io(SERVER));
  }

  const createSocketSubscription = (
    event: string,
    fn: (payload: any) => void
  ) => {
    if (!socket) {
      throw new Error("You forgot to call `create`!");
    }

    socket.on(event, fn);
    return () => socket.off(event, fn);
  };

  return { create, createSocketSubscription };
};

export const socketService = createSocketService();

export type SocketServce = typeof socketService;
