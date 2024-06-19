export class AppRoutingConstants {
  public static readonly BASE_URL: string = 'http://localhost:3000';

  // Homepage
  public static readonly HOMEPAGE: string = '/';
  public static readonly EXCHANGE: string = '/exchanges';
  public static readonly POST_PRODUCT: string = `/post-product`;
  // User
  public static readonly CURRENT_USER_PATH: string = `${AppRoutingConstants.BASE_URL}/user`;
  public static readonly LOGOUT_PATH: string = `${AppRoutingConstants.BASE_URL}/user/logout`;

  // Product
  public static readonly PRODUCTS_PATH: string = `${AppRoutingConstants.BASE_URL}/products`;
  public static readonly MY_PRODUCTS_PATH: string = `${AppRoutingConstants.BASE_URL}/products/my-products`;

  // Transaction - Exchange
  public static readonly EXCHANGE_REQUESTS_PATH: string = `${AppRoutingConstants.BASE_URL}/exchanges/request`;
  public static readonly EXCHANGE_ACCEPT_PATH: string = `${AppRoutingConstants.BASE_URL}${AppRoutingConstants.EXCHANGE}/accept`;
  public static readonly EXCHANGE_REJECT_PATH: string = `${AppRoutingConstants.BASE_URL}${AppRoutingConstants.EXCHANGE}/reject`;
}
