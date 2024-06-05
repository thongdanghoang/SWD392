import './ProductDetail.scss';
import AppButton from '../buttons/AppButton.tsx';
import {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../services/application.service.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {
  ProductDTO,
  getProductStatusDisplay
} from '../../../homepage/model/productDto.ts';

function ProductDetail(): ReactElement {
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const {id} = useParams<{id: string}>();
  const [currentProduct, setCurrentProduct] = useState<ProductDTO | null>(null);

  useEffect(() => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          setCurrentProduct({
            ...response.data.data,
            imageUrl:
              'https://binhminhdigital.com/storedata/images/product/canon-eos-4000d-kit-1855mm-f3556-iii-den.jpg',
            summary:
              'Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla nibh diam, blandit vel consequat nec, ultrices et ipsum. Nulla varius magna a consequat pulvinar. '
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const [liked, setLiked] = useState(false);

  const handleLikeClick = (): void => {
    setLiked(!liked);
  };

  const formatToVietnameseCurrency = (amount: number | undefined): string => {
    if (amount) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      return formatter.format(amount);
    }
    return '';
  };

  return (
    <div className="product-detail container">
      <section>
        <div className="px-3 px-lg-5 my-1 mb-3 my-5">
          <div className="row gx-4 align-items-start">
            <div className="col-6">
              <img
                className="card-img"
                src={currentProduct?.imageUrl}
                alt="Product image"
              />
              <div className="information flex-column d-flex gap-3">
                <div className="d-flex align-items-center justify-content-between">
                  <h1 className="bold-32 text-color-quaternary">
                    {currentProduct?.title}
                  </h1>
                  <div
                    className="wish-btn clickable d-flex justify-content-center align-items-center"
                    onClick={handleLikeClick}
                  >
                    {liked ? (
                      <i className="bi bi-heart-fill text-color-sub-color"></i>
                    ) : (
                      <i className="bi bi-heart text-color-sub-color"></i>
                    )}
                  </div>
                </div>
                <div className="suggested-price">
                  <div className="semibold-20 text-color-tertiary">
                    {formatToVietnameseCurrency(currentProduct?.suggestedPrice)}
                  </div>
                  <hr />
                </div>
                <div className="regular-14 text-color-tertiary">
                  {currentProduct?.summary}
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Số điện thoại:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {`0978 45* *** (Nhấn để hiện số)`}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Địa chỉ:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Xuất xứ:
                  </div>
                  <div className="regular-14 text-color-tertiary">Hàn Quốc</div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Thông tin sử dụng:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    In trên bao bì
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Tình trạng:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {getProductStatusDisplay(currentProduct?.status)}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Chính sách bảo hành:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    Bảo hành chính hãng
                  </div>
                </div>
                <div className="d-flex align-items-center gap-4">
                  <div className="regular-14 text-color-tertiary">
                    Chia sẻ tin đăng này cho bạn bè:
                  </div>
                  <i className="text-color-quaternary fs-5 bi bi-facebook "></i>
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
                        <img
                          className="avatar"
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt="avatar"
                        />
                      </div>
                      <div className="info-and-rating">
                        <div className="semibold-20 text-color-quaternary">
                          {currentProduct?.owner
                            ? `${currentProduct?.owner.firstName} ${currentProduct?.owner.lastName}`
                            : 'Người bán'}
                        </div>
                        <div className="rating d-flex gap-3">
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
                          <div className="number-of-rates regular-14 text-color-quaternary">
                            (10)
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="view-owner">
                      <AppButton
                        variant="secondary"
                        children={`Xem trang cá nhân`}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="follow col-6 d-flex justify-content-between">
                    <div className="following regular-14 text-color-quaternary">
                      12 đang theo dõi
                    </div>
                    <div className="followers regular-14 text-color-quaternary">
                      12 người theo dõi
                    </div>
                  </div>
                </div>
              </div>
              <div className="semibold-20 text-color-quaternary">
                Liên hệ với người bán
              </div>
              <div className="d-flex flex-column gap-4">
                <AppButton
                  variant="primary"
                  children={`Giao dịch ngay`}
                  onClick={() =>
                    navigate(`/exchange-request/${currentProduct?.id}`)
                  }
                />
                <AppButton
                  variant="secondary"
                  children={`Chat với người này`}
                />
              </div>
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
                  <div className="regular-12 text-color-quaternary">
                    Tìm hiểu thêm{'>>>>'}{' '}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center gap-3">
                <i className="fs-1 bi bi-shield-check text-color-quaternary"></i>
                <div className="regular-12 text-color-quaternary">
                  Tin đăng này đã được kiểm duyệt. Nếu gặp vấn đề, vui lòng báo
                  cáo tin đăng hoặc liên hệ CSKH để được trợ giúp.
                  {` `}
                  <a className="text-decoration-none text-color-quaternary">
                    Xem thêm {'>>>'}
                  </a>
                </div>
              </div>
              <div className="report-actions d-flex justify-content-between">
                <AppButton
                  variant="secondary"
                  children={`Báo tin không hợp lệ`}
                />
                <AppButton
                  variant="secondary"
                  className="ms-2"
                  children={`Báo tin đã bán`}
                />
                <AppButton
                  variant="primary"
                  className="ms-2"
                  children={`Đăng tin ngay!`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-light">
        <div className="container px-4 px-lg-5">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="fw-bolder mb-4">Tin đăng tương tự</h2>
            <a className="fw-bold">Xem thêm{'->'} </a>
          </div>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top card-img"
                  src="https://orion.vn/media/qwuesoiv/cestbon-5p-creamcheese-mockup.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-left">
                    <h5 className="small">C'est Bon Sốt Kem Phô Mai 8P</h5>
                    $2
                  </div>
                  <div className="text-left small">Đăng cách đây 1 tiếng</div>
                </div>
                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent"></div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top card-img"
                  src="https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lnfsywolz0jeb2"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-left">
                    <h5 className="small">Bông đất sét theo yêu cầu</h5>
                    $10
                  </div>
                  <div className="text-left small">Đăng cách đây 1 tiếng</div>
                </div>
                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent"></div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top card-img"
                  src="https://sbooks.vn/wp-content/uploads/2023/05/1-26.png"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-left">
                    <h5 className="small">Sách đắc nhân tâm</h5>
                    $5
                  </div>
                  <div className="text-left small">Đăng cách đây 1 tiếng</div>
                </div>
                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent"></div>
              </div>
            </div>
            <div className="col mb-5">
              <div className="card h-100">
                <img
                  className="card-img-top card-img"
                  src="https://123wow.vn/cdn/shop/products/1q8RDtfv4GuU5IB6cP4ohTs9KN4aXXKml.jpg?v=1659170828"
                  alt="..."
                />
                <div className="card-body p-4">
                  <div className="text-left">
                    <h5 className="small">Sách trẻ em 3 quyển</h5>
                    $10
                  </div>
                  <div className="text-left small">Đăng cách đây 1 tiếng</div>
                </div>
                <div className="card-footer p-1 pt-0 border-top-0 bg-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;
