import { io } from "socket.io-client";
import environments from "../../environments/environments";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production"
    ? undefined
    : environments.NEXT_PUBLIC_WEBSOCKET_SERVER;

export const socket = io(URL!);
