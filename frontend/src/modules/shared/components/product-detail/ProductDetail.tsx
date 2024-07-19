import './ProductDetail.scss';
import AppButton from '../buttons/AppButton.tsx';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {useApplicationService} from '../../services/application.service.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {
  ProductStatus,
  ProductWithOwnerDTO
} from '../../../homepage/model/productWithOwnerDTO.ts';
import {UserDto} from '../../models/userDto.ts';
import {UserContext} from '../../services/userContext.ts';
import {formatToVietnameseCurrency} from '../../utils.ts';
import {getWardByCode} from 'vn-local-plus';
import {DeleteProductConfirmationModal} from './DeleteProductConfirmationModal.tsx';
import {useModal} from '../modal/useModal.tsx';
import {socket} from '../../applicationConstants.ts';

export interface Room {
  roomId: string;
  buyerId: string;
  sellerId: string;
}

export default function ProductDetail(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const {id} = useParams<{id: string}>();
  const [currentProduct, setCurrentProduct] =
    useState<ProductWithOwnerDTO | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handleExchangeRequestClick = (): void => {
    if (currentProduct?.isMyProduct) {
      return navigate(`/`);
    }
    navigate(`/exchange-request/${currentProduct?.id}`);
  };
  const handleChatClick = async (): Promise<void> => {
    const buyerId = currentUser?.id;
    const sellerId = currentProduct?.owner.id;
    socket.emit('createRoom', {buyerId, sellerId}, (): void => {
      navigate(`/chat`);
    });
  };
  useEffect(() => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          setCurrentProduct(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);
  const modalContext = useModal();
  if (!modalContext) {
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  if (!modalContext) {
    return <div>Loading...</div>;
  }
  const handleDeleteProduct = (): void => {
    applicationService
      .createApiClient()
      .delete(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
      .then((): void => {
        navigate(`/`);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleThumbnailClick = (index: number): void => {
    setCurrentImageIndex(index);
  };
  const handlePreviousImage = (): void => {
    setCurrentImageIndex(prevIndex =>
      prevIndex === 0 ? currentProduct!.images.length - 1 : prevIndex - 1
    );
  };
  const handleNextImage = (): void => {
    setCurrentImageIndex(
      prevIndex => (prevIndex + 1) % currentProduct!.images.length
    );
  };
  return (
    <div className="product-detail container">
      <section>
        <div className="px-3 px-lg-5 my-1 mb-3 my-5">
          <div className="row gx-5 align-items-start">
            <div className="col-6 position-relative">
              {currentProduct?.images && currentProduct.images.length > 0 && (
                <div className="image-container">
                  <img
                    className="card-img fixed-size"
                    src={currentProduct.images[currentImageIndex]}
                    alt="Product image"
                  />
                  <div className="image-nav-buttons">
                    <button
                      className="image-nav-button prev-button"
                      onClick={handlePreviousImage}
                    >
                      &lt;
                    </button>
                    <button
                      className="image-nav-button next-button"
                      onClick={handleNextImage}
                    >
                      &gt;
                    </button>
                  </div>
                </div>
              )}
              {!currentProduct?.images && (
                <img
                  className="card-img"
                  src={currentProduct?.images[0]}
                  alt="Product image"
                />
              )}
              <div className="thumbnails">
                {currentProduct?.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Thumbnail ${index}`}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
              </div>
              <div className="information flex-column d-flex gap-2">
                <div className="d-flex align-items-center justify-content-between">
                  <h1 className="bold-32 text-color-quaternary">
                    {currentProduct?.title}
                  </h1>
                </div>
                <div className="suggested-price">
                  <div className="semibold-20 text-color-tertiary">
                    {currentProduct?.isGiveAway
                      ? 'Cho tặng miễn phí'
                      : formatToVietnameseCurrency(
                          currentProduct?.suggestedPrice
                        )}
                  </div>
                  <hr />
                </div>
                <div className="regular-14 text-color-tertiary">
                  {currentProduct?.summary}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Tình trạng:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {currentProduct?.isUsed ? 'Đã qua sử dụng' : 'Mới'}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Số điện thoại:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {`${
                      applicationService.isAuthenticated()
                        ? currentProduct?.owner?.phone ?? 'Chưa cập nhật'
                        : `${currentProduct?.owner?.phone.slice(0, 4)}****`
                    }`}
                  </div>
                  {!applicationService.isAuthenticated() && (
                    <div
                      className="regular-14 text-color-quaternary clickable"
                      onClick={() => applicationService.signIn()}
                    >
                      (Đăng nhập để xem số điện thoại)
                    </div>
                  )}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Địa chỉ:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {currentProduct &&
                      `${currentProduct.addressDetail}, ${getWardByCode(currentProduct.wardCode)?.fullName}`}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4 d-none">
                  <div className="regular-14 text-color-tertiary">
                    Chia sẻ tin đăng này cho bạn bè:
                  </div>
                  <i className="text-color-quaternary fs-5 bi bi-facebook"></i>
                  <i className="text-color-quaternary fs-5 bi bi-twitter "></i>
                  <i className="text-color-quaternary fs-5 bi bi-instagram "></i>
                  <i className="text-color-quaternary fs-5 bi bi-share-fill"></i>
                </div>
              </div>
            </div>
            <div className="col-6 d-flex flex-column gap-4">
              <div className="col-12 flex-column d-flex gap-2">
                <div className="row">
                  <div className="owner d-flex justify-content-between">
                    <div className="owner-info d-flex gap-3">
                      <div className="avatar">
                        {currentProduct?.owner?.avatar ? (
                          <img
                            src={currentProduct?.owner?.avatar}
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
                      <div className="info-and-rating d-flex align-items-center">
                        <div className="semibold-20 text-color-quaternary">
                          {currentProduct?.owner
                            ? `${currentProduct?.owner.firstName} ${currentProduct?.owner.lastName}`
                            : 'Người bán'}
                        </div>
                      </div>
                    </div>
                    {!currentProduct?.isMyProduct && (
                      <div className="view-owner">
                        <AppButton
                          variant="secondary"
                          children={`Xem trang cá nhân`}
                          onClick={() => {
                            if (!applicationService.isAuthenticated()) {
                              applicationService.signIn();
                            } else {
                              navigate(
                                `/seller-profile/${currentProduct?.owner.id}`
                              );
                            }
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {currentProduct?.isMyProduct === false && (
                <div className="semibold-20 text-color-quaternary">
                  Liên hệ với người bán
                </div>
              )}
              {currentProduct?.isMyProduct &&
                currentProduct.status === ProductStatus.PUBLISHED && (
                  <div className="d-flex flex-column gap-4">
                    <AppButton
                      variant="secondary"
                      children={`Chỉnh sửa bài đăng`}
                      onClick={() =>
                        navigate(`/products/modify/${currentProduct?.id}`)
                      }
                    />
                    <AppButton
                      variant="tertiary"
                      children={`Gỡ sản phẩm này không trao đổi nữa`}
                      onClick={() =>
                        showModal(
                          DeleteProductConfirmationModal,
                          handleDeleteProduct
                        )
                      }
                    />
                  </div>
                )}
              {currentProduct?.isMyProduct === false && (
                <div className="d-flex flex-column gap-4">
                  {!applicationService.isModeratorUser() &&
                    currentProduct.status === ProductStatus.PUBLISHED && (
                      <AppButton
                        variant="primary"
                        children={`Giao dịch ngay`}
                        onClick={() =>
                          applicationService.checkIsUserDoActionOrElseNavigateLoginPage(
                            handleExchangeRequestClick
                          )
                        }
                      />
                    )}
                  {!currentProduct.isMyProduct && (
                    <AppButton
                      variant="secondary"
                      children={`Chat với người này`}
                      onClick={() =>
                        applicationService.checkAuthenticatedDoActionOrElseNavigateLoginPage(
                          handleChatClick
                        )
                      }
                    />
                  )}
                </div>
              )}
              <div className="row d-flex align-items-center">
                <div className="col-6 flex-shrink-0">
                  <img
                    src="https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37350.jpg?t=st=1717578898~exp=1717582498~hmac=e21a4ccba3ea18221fb79603f76644ed74c9c89cc19ddeb967b1ba55f88ce21f&w=1800"
                    alt="Safe exchange"
                    width={313}
                    height={170}
                  />
                </div>
                <div className="col-6 report-note d-flex flex-column gap-3">
                  <div className="regular-12 text-color-quaternary">
                    Lưu ý và cảnh giác các hoạt động đáng ngờ liên quan đến giao
                    dịch trên website. Để đảm bảo an toàn trong giao dịch và bảo
                    vệ quyền lợi cá nhân của quý khách, xin vui lòng báo cáo cho
                    chúng tôi khi thấy có các dấu hiệu bất thường và đáng ngờ.
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="fs-1 bi bi-shield-check text-color-quaternary"></i>
                {(currentProduct?.status === ProductStatus.PUBLISHED ||
                  currentProduct?.status === ProductStatus.EXCHANGING ||
                  currentProduct?.status === ProductStatus.EXCHANGED) && (
                  <div className="regular-12 text-color-quaternary">
                    Tin đăng này đã được kiểm duyệt. Nếu gặp vấn đề, vui lòng
                    báo cáo tin đăng hoặc liên hệ CSKH để được trợ giúp.
                    {` `}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
