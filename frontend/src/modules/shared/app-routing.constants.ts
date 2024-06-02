export class AppRoutingConstants {
  public static readonly BASE_URL: string = 'http://localhost:3000';

  // Homepage
  public static readonly HOMEPAGE: string = '/';

  // User
  public static readonly CURRENT_USER_PATH: string = `${AppRoutingConstants.BASE_URL}/user`;

  // Product
  public static readonly PRODUCTS_PATH: string = `${AppRoutingConstants.BASE_URL}/products`;
}
