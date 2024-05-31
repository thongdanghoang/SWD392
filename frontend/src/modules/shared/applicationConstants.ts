import io from 'socket.io-client';

export class ApplicationConstants {
  public static readonly DEFAULT_LIMIT: number = 20;
}

export const socket = io('https://thongdanghoang.id.vn', {
  path: '/swapme/chat-gateway/socket.io',
  transports: ['websocket'],
  autoConnect: true
});
