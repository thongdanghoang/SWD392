import {ReactElement, useEffect, useState} from 'react';
import './SellerProfile.scss';
import {useNavigate, useParams} from 'react-router-dom';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO';
import {useApplicationService} from '../../services/application.service';
import {AppRoutingConstants} from '../../app-routing.constants';
import AppButton from '../buttons/AppButton';
import {UserDto} from '../../models/userDto';
import io from 'socket.io-client';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';

// Replace with your NestJS server URL
const socket = io('http://localhost:3001/chat', {
  transports: ['websocket'] // Ensure WebSocket transport is used
});

export default function UserProfile({
  currentUser
}: {
  currentUser: UserDto | null;
}): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

  const handleChatClick = async (): Promise<void> => {
    const buyerId = currentUser?.id;
    const sellerId = currentProduct?.owner.id;
    socket.emit('createRoom', {buyerId, sellerId}, (): void => {
      navigate(`/chat`);
    });
  };

  // Fetch product detail by id
  const {id} = useParams<{id: string}>();
  const [currentProduct, setCurrentProduct] =
    useState<ProductWithOwnerDTO | null>(null);

  useEffect((): void => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          if (response.data.data.isMyProduct) {
            console.error('You cannot exchange your own product');
            navigate(AppRoutingConstants.HOMEPAGE);
          } else {
            setCurrentProduct(response.data.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id, navigate]);

  // Fetch seller products by seller ID
  const [sellerProducts, setSellerProducts] = useState<ProductWithOwnerDTO[]>(
    []
  );

  useEffect((): void => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          setSellerProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);

  // Function to handle tab click
  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');
  const handleTabClick = (tab: 'selling' | 'sold'): void => {
    setActiveTab(tab);
  };

  const formatToVietnameseCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
  };

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
                  {currentProduct?.owner?.firstName}{' '}
                  {currentProduct?.owner?.lastName}
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
          >
            Đã bán
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}
      <div>
        {activeTab === 'selling' ? (
          <div>
            <div className="d-flex gap-4 flex-column">
              <div className="exchange-info d-flex gap-3">
                {sellerProducts.length > 0 ? (
                  <div className="my-products d-flex justify-content-start gap-3">
                    {sellerProducts?.map((product: ProductWithOwnerDTO) => (
                      <li
                        key={product.id}
                        className="product-card clickable"
                        onClick={navigateToDetail(product.id)}
                      >
                        <div className="product-image">
                          <img src={product.images[0]} alt={product.title} />
                        </div>
                        <div className="product-info">
                          <div className="d-flex flex-column align-items-start">
                            <h2 className="product-title">{product.title}</h2>
                            <p className="product-price">
                              {formatToVietnameseCurrency(
                                product.suggestedPrice
                              )}
                            </p>
                            <p className="product-creation-date">
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
        ) : (
          <div>
            <div className="regular-14 text-color-quaternary">
              Người này chưa bán sản phẩm nào.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
