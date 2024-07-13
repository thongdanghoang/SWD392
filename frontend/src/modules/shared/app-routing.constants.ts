export class AppRoutingConstants {
  public static readonly BASE_URL: string = 'http://localhost:3000';
  public static readonly CHAT_GATEWAY_URL: string =
    'http://localhost:3001/chat';

  // Homepage
  public static readonly HOMEPAGE: string = '/';
  public static readonly EXCHANGE: string = '/exchanges';
  public static readonly POST_PRODUCT: string = `/post-product`;
  public static readonly PRODUCTS: string = `/products`;
  // User
  public static readonly USER_PATH: string = `${AppRoutingConstants.BASE_URL}/user`;
  public static readonly LOGOUT_PATH: string = `${AppRoutingConstants.BASE_URL}/user/logout`;
  public static readonly UPDATE_AVATAR_PATH: string = `${AppRoutingConstants.BASE_URL}/user/avatar`;

  // Product
  public static readonly PRODUCTS_PATH: string = `${AppRoutingConstants.BASE_URL}/products`;
  public static readonly MY_PRODUCTS_PATH: string = `${AppRoutingConstants.BASE_URL}/products/my-products`;
  public static readonly MY_PRODUCTS_CAN_BE_EXCHANGE_PATH: string = `${AppRoutingConstants.BASE_URL}/products/for-exchange`;

  // Transaction - Exchange
  public static readonly EXCHANGE_PATH: string = `${AppRoutingConstants.BASE_URL}/exchanges`;
  public static readonly EXCHANGE_REQUESTS_PATH: string = `${AppRoutingConstants.BASE_URL}/exchanges-requests`;
  public static readonly EXCHANGE_ACCEPT_PATH: string = `${AppRoutingConstants.BASE_URL}/exchanges-requests/accept`;
  public static readonly EXCHANGE_REJECT_PATH: string = `${AppRoutingConstants.BASE_URL}/exchanges-requests/reject`;

  // Chat
  public static readonly CHAT_PATH: string = `${AppRoutingConstants.BASE_URL}/chat`;

  // Not found
  public static readonly NOT_FOUND_PATH: string = '/';
}
