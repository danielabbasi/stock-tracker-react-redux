import io from "socket.io-client";
import { ApiPayload } from "utils/payload";
import { EventActionsMap } from "./eventActions";

const HOST = window.location.hostname;
const PORT = 5000;
const SERVER = `${HOST}:${PORT}`;

const createSocketService = () => {
  let socket: SocketIOClient.Socket;

  function create() {
    return socket || (socket = io(SERVER));
  }

  const createSocketSubscription = <E extends keyof EventActionsMap>(
    event: E,
    fn: (payload: ApiPayload<EventActionsMap[E]["payload"]>) => void
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

export type SocketService = typeof socketService;
