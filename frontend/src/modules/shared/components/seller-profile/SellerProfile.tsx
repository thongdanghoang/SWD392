import {ReactElement, useContext, useEffect, useState} from 'react';
import './SellerProfile.scss';
import '../../../homepage/components/product-card/ProducCard.scss';
import {useNavigate, useParams} from 'react-router-dom';
import {
  ProductStatus,
  ProductWithOwnerDTO
} from '../../../homepage/model/productWithOwnerDTO';
import {useApplicationService} from '../../services/application.service';
import {AppRoutingConstants} from '../../app-routing.constants';
import AppButton from '../buttons/AppButton';
import {UserDto} from '../../models/userDto';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {UserContext} from '../../services/userContext.ts';
import {formatToVietnameseCurrency} from '../../utils.ts';
import {socket} from '../../applicationConstants.ts';

export default function UserProfile(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const [seller, setSeller] = useState<UserDto | null>(null);
  const applicationService = useApplicationService();
  const navigate = useNavigate();
  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };
  const handleChatClick = async (): Promise<void> => {
    const buyerId = currentUser?.id;
    const sellerId = seller?.id;
    socket.emit('createRoom', {buyerId, sellerId}, (): void => {
      navigate(`/chat`);
    });
  };

  // Fetch seller info
  const {id} = useParams<{id: string}>();

  async function fetchSellerInfo(id: string): Promise<any> {
    const response = await applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.BASE_URL}/user/${id}`);
    return response.data;
  }

  useEffect((): void => {
    if (id) {
      fetchSellerInfo(id)
        .then((data: any) => {
          setSeller(data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  // Fetch seller products by seller ID
  const [sellerProducts, setSellerProducts] = useState<ProductWithOwnerDTO[]>(
    []
  );
  useEffect((): void => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/user/${id}/products`)
        .then(response => {
          setSellerProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');
  const handleTabClick = (tab: 'selling' | 'sold'): void => {
    setActiveTab(tab);
  };
  const sellingProducts = sellerProducts.filter(
    product => product.status === ('PUBLISHED' as ProductStatus)
  );

  return (
    <div className="container user-profile">
      <div className="my-5 d-flex gap-4 flex-column">
        <div className="box">
          <div className="owner d-flex justify-content-between">
            <div className="owner-info d-flex gap-3">
              <div className="avatar">
                <img
                  className="avatar"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="avatar"
                />
              </div>
              <div className="info-and-rating">
                <div className="semibold-20 text-color-quaternary">
                  {seller?.firstName} {seller?.lastName}
                </div>
                <div className="rating d-flex gap-2 mt-1">
                  <div className="rate-point semibold-16 text-color-quaternary">
                    5.0
                  </div>
                  <div className="stars d-flex">
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-half text-color-secondary"></i>
                    <i className="bi bi-star text-color-secondary"></i>
                  </div>
                  <div className="number-of-rates regular-14 text-color-quaternary mt-1">
                    (10)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="actions d-flex justify-content-between gap-2 mt-3">
            <AppButton className="button" variant="primary">
              Theo dõi
            </AppButton>
            <AppButton
              className="button"
              variant="secondary"
              onClick={handleChatClick}
            >
              Chat với người này
            </AppButton>
            <AppButton className="button" variant="tertiary">
              Báo cáo người này
            </AppButton>
          </div>
        </div>

        <div className="d-flex bold-25 text-color-quaternary justify-content-center">
          <div
            className={`col-6 clickable tab ${activeTab === 'selling' ? 'active' : ''}`}
            onClick={() => handleTabClick('selling')}
          >
            Đang bán
          </div>
          <div
            className={`col-6 clickable tab ${activeTab === 'sold' ? 'active' : ''}`}
            onClick={() => handleTabClick('sold')}
          ></div>
        </div>
      </div>

      {/* Conditional Rendering */}
      <div>
        {activeTab === 'selling' && (
          <div>
            <div className="d-flex gap-4 flex-column">
              <div className="exchange-info d-flex gap-3">
                {sellingProducts.length > 0 ? (
                  <div className="my-products d-flex justify-content-start gap-3">
                    {sellingProducts?.map((product: ProductWithOwnerDTO) => (
                      <li
                        key={product.id}
                        className="product-card clickable"
                        onClick={navigateToDetail(product.id)}
                      >
                        <div className="product-image">
                          <img src={product?.images?.[0]} alt={product.title} />
                        </div>
                        <div className="product-info mt-2">
                          <div className="d-flex flex-column align-items-start">
                            <div className="product-title text-color-tertiary semibold-16">
                              {product.title}
                            </div>
                            <p className="product-price text-color-quaternary semibold-20">
                              {product?.isGiveAway
                                ? 'Cho tặng miễn phí'
                                : formatToVietnameseCurrency(
                                    product?.suggestedPrice
                                  )}
                            </p>
                            <p className="product-creation-date text-color-tertiary regular-12">
                              Đăng cách đây{' '}
                              {formatDistanceToNow(
                                new Date(product.creationDate),
                                {
                                  addSuffix: true,
                                  locale: vi
                                }
                              )}{' '}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </div>
                ) : (
                  <div className="my-products d-flex justify-content-center align-items-center">
                    <div className="regular-14 text-color-quaternary">
                      Người này chưa có sản phẩm nào để giao dịch
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
