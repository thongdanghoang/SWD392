import {ReactElement, useContext, useEffect, useState} from 'react';
import './UserProfile.scss';
import {UserDto} from '../../models/userDto';
import {useNavigate} from 'react-router-dom';
import AppButton from '../buttons/AppButton.tsx';
import {UserContext} from '../../services/userContext.ts';
import {
  ProductStatus,
  ProductWithOwnerDTO
} from '../../../homepage/model/productWithOwnerDTO.ts';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {useApplicationService} from '../../services/application.service.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import {formatToVietnameseCurrency} from '../../utils.ts';

export default function UserProfile(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');
  const navigate = useNavigate();
  const applicationService = useApplicationService();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };
  const [myProducts, setMyProducts] = useState<ProductWithOwnerDTO[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.MY_PRODUCTS_PATH)
        .then(response => {
          setMyProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);
  const sellingProducts = myProducts.filter(
    product => product.status === ('PUBLISHED' as ProductStatus)
  );
  const soldProducts = myProducts.filter(
    product => product.status === ('EXCHANGED' as ProductStatus)
  );

  // Function to handle tab click
  const handleTabClick = (tab: 'selling' | 'sold'): void => {
    setActiveTab(tab);
  };

  return (
    <div className="container user-profile">
      <div className="my-5 d-flex gap-4 flex-column">
        <div className="box">
          <div className="owner d-flex justify-content-between">
            <div className="owner-info d-flex gap-3">
              <div className="avatar">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="user-avatar"
                    style={{borderRadius: '50%'}}
                  />
                ) : (
                  <img
                    className="avatar"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="avatar"
                  />
                )}
              </div>
              <div className="info-and-rating">
                <div className="semibold-20 text-color-quaternary">
                  {currentUser?.firstName} {currentUser?.lastName}
                </div>
                <div className="rating d-flex gap-2 mt-1">
                  <div className="rate-point semibold-16 text-color-quaternary">
                    5.0
                  </div>
                  <div className="stars d-flex gap-1">
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
            <AppButton
              variant="secondary"
              onClick={() => navigate('/user/dashboard')}
              children={'Chỉnh sửa '}
            />
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
        {activeTab === 'sold' && (
          <div>
            <div className="d-flex gap-4 flex-column">
              <div className="exchange-info d-flex gap-3">
                {soldProducts.length > 0 ? (
                  <div className="my-products d-flex justify-content-start gap-3">
                    {soldProducts?.map((product: ProductWithOwnerDTO) => (
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
                      Người này chưa bán sản phẩm nào.
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
