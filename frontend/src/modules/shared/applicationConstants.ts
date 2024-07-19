import io from 'socket.io-client';
import {AppRoutingConstants} from './app-routing.constants.ts';

export class ApplicationConstants {
  public static readonly DEFAULT_LIMIT: number = 20;
}

export const socket = io(AppRoutingConstants.CHAT_GATEWAY_URL, {
  transports: ['websocket'], // Ensure WebSocket transport is used
  autoConnect: true
});
