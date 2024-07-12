import { io } from 'socket.io-client';
import { config } from 'dotenv';
config();

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_ENV_MODE === "development" ?
  process.env.NEXT_PUBLIC_NODE_SOCKET_IO : process.env.NEXT_PUBLIC_NODE_SOCKET_IO_PRODUCTION;


export const socket = io(URL);
