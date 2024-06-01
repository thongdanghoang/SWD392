import './ProductDetail.scss';
import AppButton from '../buttons/AppButton.tsx';
import {ReactElement, useEffect, useState} from 'react';
import {ProductDto} from '../../models/productDto.ts';
import {AxiosInstance} from 'axios';
import {useApplicationService} from '../../services/application.service.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';

// import { useLocation } from 'react-router-dom';

function ProductDetail(): ReactElement {
  const applicationService = useApplicationService();

  const [currentProduct, setCurrentProduct] = useState<ProductDto | null>(null);

  const fetchCurrentProduct = async (id: string): Promise<ProductDto> => {
    const apiClient: AxiosInstance = applicationService.createApiClient();
    const response = await apiClient.get(
      `${AppRoutingConstants.PRODUCTS_PATH}/${id}`
    );
    return response.data;
  };

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      fetchCurrentProduct('1')
        .then((products: ProductDto) => {
          setCurrentProduct(products);
          alert(currentProduct);
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

  const [liked, setLiked] = useState(false);

  const handleLikeClick = (): void => {
    setLiked(!liked);
  };
  return (
    <div className="product-detail">
      <section>
        <div className="container px-3 px-lg-5 my-1 mb-3">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src="https://locknlock.store/wp-content/uploads/2022/03/LHC4125BLU-1.jpg"
                alt="..."
              />
            </div>
            <div className="col-md-6">
              <div className="col-md-12">
                <div className="d-flex align-items-center justify-content-between mt-5">
                  <div className="d-flex align-items-center">
                    <i className="fs-1 bi bi-person-circle me-2"></i>
                    <h4 className="mb-1">{currentProduct?.title}</h4>
                  </div>
                  <AppButton
                    style="secondary"
                    className="px-5 ms-2"
                    children={`Xem trang cá nhân`}
                  />
                </div>
                <div className="">
                  <div className="d-flex align-items-center mb-1">
                    <span className="text-success">5.0</span>
                    <i className="bi bi-star-fill text-warning ms-1"></i>
                    <i className="bi bi-star-fill text-warning ms-1"></i>
                    <i className="bi bi-star-fill text-warning ms-1"></i>
                    <i className="bi bi-star-fill text-warning ms-1"></i>
                    <i className="bi bi-star-fill text-warning ms-1"></i>
                    <span className="ms-1">(10)</span>
                  </div>
                  <div className="d-flex mb-2">
                    <span className="me-3">12 người theo dõi</span>
                    <span>12 đang theo dõi</span>
                  </div>
                  <p className="text-muted mb-3">• Hoạt động 12 phút trước</p>
                </div>
              </div>
              <h3 className="fw-bold mt-2 mb-5">Liên hệ với người bán</h3>
              <AppButton
                style="primary"
                className="col-md-12 mb-3"
                children={`Giao dịch ngay`}
              />
              <AppButton
                style="secondary"
                className="col-md-12 mb-5"
                children={`Chat với người này`}
              />
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <img src="./safe-exchange.svg" alt="Safe exchange" />
                </div>
                <p className="ms-4 report-note">
                  Lưu ý và cảnh giác các hoạt động đáng ngờ liên quan đến giao
                  dịch trên website. Để đảm bảo an toàn trong giao dịch và bảo
                  vệ quyền lợi cá nhân của quý khách, xin vui lòng báo cáo cho
                  chúng tôi khi thấy có các dấu hiệu bất thường và đáng ngờ.
                  <br />
                  <br />
                  <a className="fw-bold">Tìm hiểu thêm{'>>>>'} </a>
                </p>
              </div>
              <div className="d-flex">
                <i className="fs-1 bi bi-shield-check"></i>
                <p className="mt-3 ms-2 report-note">
                  Tin đăng này đã được kiểm duyệt. Nếu gặp vấn đề, vui lòng báo
                  cáo tin đăng hoặc liên hệ CSKH để được trợ giúp.
                  <a className="ms-2">Xem thêm {'>>>'}</a>
                </p>
              </div>
              <AppButton style="secondary" children={`Báo tin không hợp lệ`} />
              <AppButton
                style="secondary"
                className="ms-2"
                children={`Báo tin đã bán`}
              />
              <AppButton
                style="primary"
                className="ms-2"
                children={`Đăng tin ngay!`}
              />
            </div>
            <div className="col-md-6">
              <div className="d-flex align-items-center">
                <h1 className="mb-3 col-sm-11">{currentProduct?.title}</h1>
                <div className="border rounded-circle">
                  <button className="btn btn-link" onClick={handleLikeClick}>
                    {liked ? (
                      <i className="fs-1 bi bi-heart-fill text-danger"></i>
                    ) : (
                      <i className="fs-1 bi bi-heart text-danger"></i>
                    )}
                  </button>
                </div>
              </div>
              <h2 className="text-muted">{currentProduct?.suggested_price}</h2>
              <hr />
              <p>{currentProduct?.summary}</p>
              <div className="information">
                <div className="d-flex align-items-center">
                  <h5 className="me-1">Số điện thoại:</h5>
                  <p className="mt-2">0978 45* *** (Nhấn để hiện số)</p>
                </div>
                <div className="d-flex align-items-center">
                  <h5 className="me-1">Địa chỉ:</h5>
                  <p className="mt-2">
                    Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
                  </p>
                </div>
                <div className="d-flex">
                  <div className="align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      <h5 className="me-1">Tình trạng:</h5>
                      <p className="mt-2">{currentProduct?.status}</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 className="me-1">Chính sách bảo hành:</h5>
                      <p className="mt-2">Bảo hành chính hãng</p>
                    </div>
                  </div>
                  <div className="align-items-center justify-content-between ms-3">
                    <div className="d-flex align-items-center">
                      <h5 className="me-1">Xuất xứ:</h5>
                      <p className="mt-2">Hàn Quốc</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <h5 className="me-1">Thông tin sử dụng:</h5>
                      <p className="mt-2">In trên bao bì</p>
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <h5 className="me-3 mt-1">
                    Chia sẻ tin đăng này cho bạn bè:
                  </h5>
                  <i className="fs-2 bi bi-facebook me-3"></i>
                  <i className="fs-2 bi bi-twitter me-3"></i>
                  <i className="fs-2 bi bi-instagram me-3"></i>
                  <i className="fs-2 bi bi-share-fill"></i>
                </div>
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
