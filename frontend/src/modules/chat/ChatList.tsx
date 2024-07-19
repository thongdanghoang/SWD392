import React, {
  ReactElement,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
import {useApplicationService} from '../shared/services/application.service.ts';
import './ChatList.scss';
import {UserDto} from 'src/modules/shared/models/userDto.ts';
import {AppRoutingConstants} from '../shared/app-routing.constants.ts';
import {UserContext} from '../shared/services/userContext.ts';
import {socket} from '../shared/applicationConstants.ts';

interface Room {
  roomId: string;
  buyerId: string;
  sellerId: string;
  lastMessage: string;
  lastMessageTime: string;
}

interface Message {
  roomId: string;
  sender: string;
  message: string;
  createdAt: Date;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

function ChatRoom({
  roomId,
  currentUserId
}: {
  roomId: string;
  currentUserId: number | undefined;
}): ReactElement {
  const userId = currentUserId?.toString() || '';
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [sellerName, setSellerName] = useState('');
  const applicationService = useApplicationService();
  const parts = roomId.split('-');
  const buyerId = parts.slice(0, 5).join('-');
  const sellerId = parts.slice(5).join('-');
  const idToFetch = sellerId === userId ? buyerId : sellerId;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  async function fetchSellerInfo(sellerId: string): Promise<any> {
    const response = await applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.BASE_URL}/user/${sellerId}`);
    return response.data;
  }

  useEffect(() => {
    void fetchSellerInfo(idToFetch).then(sellerData => {
      setSellerName(`${sellerData.firstName} ${sellerData.lastName}`);
    });
  }, [idToFetch]);

  useEffect(() => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.CHAT_PATH}/messages/${roomId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error('Error fetching messages:', error));
  }, [roomId]);

  useEffect(() => {
    const handleNewMessage = (newMessage: Message): void => {
      setMessages(prevMessages => [...prevMessages, newMessage]);
    };

    socket.on('newMessage', handleNewMessage);

    return (): void => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [roomId]);

  useEffect(() => {
    const chatHistoryElement = document.querySelector('.chat-history');
    if (chatHistoryElement) {
      chatHistoryElement.scrollTop = chatHistoryElement.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (event: React.FormEvent): void => {
    event.preventDefault();

    if (message.trim()) {
      const newMessage: Message = {
        roomId,
        sender: userId,
        message,
        createdAt: new Date()
      };
      socket.emit('sendMessage', newMessage);
      setMessage('');
    }
  };

  return (
    <div className="chat">
      <div className="chat-header clearfix">
        <div className="row">
          <div className="col-lg-6">
            <a
              href="javascript:void(0);"
              data-toggle="modal"
              data-target="#view_info"
            >
              <img
                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                alt="avatar"
              />
            </a>
            <div className="chat-about">
              <h6 className="m-b-0">{sellerName}</h6>
            </div>
          </div>
          <div className="col-lg-6 hidden-sm text-right"></div>
        </div>
      </div>
      <div className="chat-history">
        <ul className="m-b-0">
          {messages.map((msg, index) => (
            <li key={index} className="clearfix">
              <div
                className={`message ${msg.sender === userId ? 'my-message' : 'other-message'}`}
              >
                {msg.message}
                <div className="message-data">
                  <span className="message-data-time">
                    {new Intl.DateTimeFormat('default', {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                    }).format(new Date(msg.createdAt))}
                  </span>
                </div>
              </div>
            </li>
          ))}
          <div ref={messagesEndRef} />
        </ul>
      </div>
      <div className="chat-message clearfix">
        <form onSubmit={sendMessage}>
          <div className="input-group mb-0">
            <input
              type="text"
              className="form-control"
              placeholder="Enter text here..."
              value={message}
              onChange={event => setMessage(event.target.value)}
            />
            <div className="input-group-append">
              <button className="btn btn-send" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  color="#70E2A2"
                >
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatList(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const applicationService = useApplicationService();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [sellers, setSellers] = useState<Record<string, User>>({});
  const [selectedRoom, setSelectedRoom] = useState('');

  useEffect(() => {
    if (currentUser?.id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.CHAT_PATH}/rooms/${currentUser.id}`)
        .then(response => {
          const roomsData: Room[] = response.data;
          setRooms(roomsData);
          roomsData.forEach(room => {
            const userIdToFetch =
              room.sellerId.toString() === currentUser.id.toString()
                ? room.buyerId
                : room.sellerId;
            void fetchSellerInfo(userIdToFetch);
          });
        })
        .catch(error => console.error('Error fetching rooms:', error));
    }
  }, [currentUser?.id]);

  const fetchSellerInfo = async (userIdToFetch: string): Promise<any> => {
    try {
      const response = await applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.BASE_URL}/user/${userIdToFetch}`);
      const sellerData = response.data;
      if (sellerData) {
        const seller = sellerData;
        setSellers(prevSellers => ({
          ...prevSellers,
          [userIdToFetch]: {
            id: seller.id,
            firstName: seller.firstName,
            lastName: seller.lastName,
            avatarUrl:
              seller.avatarUrl ||
              'https://bootdey.com/img/Content/avatar/avatar1.png'
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching product info:', error);
    }
  };
  const onSelectRoom = (roomId: string): void => {
    setSelectedRoom(roomId);
    socket.emit('joinRoom', roomId);
  };

  return (
    <div className="container">
      <div className="row clearfix">
        <div className="col-lg-12">
          <div className="card chat-app">
            <div id="plist" className="people-list" style={{height: '100%'}}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search..."
                />
              </div>
              <ul
                className="list-unstyled chat-list mt-2 mb-0"
                style={{
                  height: '100%',
                  width: 'max-content',
                  paddingRight: '5px'
                }}
              >
                {rooms.map(room => {
                  const seller =
                    sellers[room.sellerId] || sellers[room.buyerId];
                  return (
                    <li
                      key={room.roomId}
                      className={`clearfix ${selectedRoom === room.roomId ? 'active' : ''}`}
                      onClick={() => onSelectRoom(room.roomId)}
                    >
                      <img
                        src={
                          seller?.avatarUrl ||
                          'https://bootdey.com/img/Content/avatar/avatar1.png'
                        }
                        alt="avatar"
                      />
                      <div className="about">
                        <div className="name">
                          {seller?.firstName && seller?.lastName
                            ? `${seller.firstName} ${seller.lastName}`
                            : 'Loading...'}
                        </div>
                        <div className="status">
                          <i className="fa fa-circle offline"></i>{' '}
                          {room.lastMessageTime}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            {selectedRoom && (
              <ChatRoom roomId={selectedRoom} currentUserId={currentUser?.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatList;
