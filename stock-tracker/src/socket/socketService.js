import io from "socket.io-client";

const HOST = window.location.hostname;
const PORT = 5000;
const SERVER = `${HOST}:${PORT}`;

const createSocketService = () => {
  let socket;

  function create() {
    return socket || (socket = io(SERVER));
  }

  const getSocketSubscription = (socket, event, fn) => {
    socket.on(event, fn);
    return () => socket.off(fn);
  };

  return { create, getSocketSubscription };
};

export const socketService = createSocketService();
