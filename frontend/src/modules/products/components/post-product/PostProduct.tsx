import './PostProduct.scss';
import '@assets/styles/styles.scss';
import {Form} from 'react-bootstrap';
import React, {ReactElement} from 'react';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import {useModal} from '../../../shared/components/modal/useModal.tsx';
import AddressFormModal, {AddressDto} from '../AddressFormModal.tsx';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useNavigate} from 'react-router-dom';

interface ProductDTO extends AddressDto {
  title: string;
  suggestedPrice: string;
}

export default function PostProduct(): ReactElement {
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const [fullName, setFullName] = React.useState<string>('');
  const [product, setProduct] = React.useState<ProductDTO>({
    title: '',
    suggestedPrice: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
    addressDetail: ''
  });
  const modalContext = useModal();
  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  const handleAddressFormModalSubmit = (data: any): void => {
    setFullName(data.fullName);
    setProduct({
      ...product,
      provinceCode: data.provinceCode,
      districtCode: data.districtCode,
      wardCode: data.wardCode,
      addressDetail: data.addressDetail
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Here you can handle the form submission.
    // The form data is in the state variables.
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.PRODUCTS_PATH}`, product)
      .then(
        (): void => {
          navigate(`${AppRoutingConstants.HOMEPAGE}`);
        },
        error => {
          console.error(error);
        }
      );
  };

  return (
    <div className="container my-5">
      <div className="row mb-3">
        <div className="col-4">
          <div className="semibold-20 text-color-quaternary">
            Hình ảnh và video sản phẩm
          </div>
        </div>
      </div>
      <div className="row">
        <Form className="upload col-4 gap-3 d-flex flex-column">
          <div className="upload-images d-flex justify-content-center align-items-center">
            <div className="upload-button d-flex flex-column align-items-center gap-1">
              <input type="file" id="upload-picture" className="d-none" />
              <label htmlFor="upload-picture">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="99"
                  height="98"
                  viewBox="0 0 99 98"
                  fill="none"
                >
                  <g clipPath="url(#clip0_3963_59332)">
                    <path
                      d="M87.612 21.7778H67.7398L64.8542 14.3733C64.4594 13.3501 63.7648 12.47 62.8613 11.8483C61.9578 11.2265 60.8876 10.8921 59.7909 10.8889H39.2109C38.1095 10.8866 37.0333 11.2185 36.1245 11.8406C35.2156 12.4627 34.5168 13.3458 34.1203 14.3733L31.262 21.7778H11.3898C9.9458 21.7778 8.56098 22.3514 7.53995 23.3724C6.51892 24.3935 5.94531 25.7783 5.94531 27.2222V81.6667C5.94531 83.1106 6.51892 84.4954 7.53995 85.5165C8.56098 86.5375 9.9458 87.1111 11.3898 87.1111H87.612C89.0559 87.1111 90.4408 86.5375 91.4618 85.5165C92.4828 84.4954 93.0564 83.1106 93.0564 81.6667V27.2222C93.0564 25.7783 92.4828 24.3935 91.4618 23.3724C90.4408 22.3514 89.0559 21.7778 87.612 21.7778ZM87.612 81.6667H11.3898V27.2222H34.9914L39.2109 16.3333H59.7909L64.0103 27.2222H87.612V81.6667Z"
                      fill="#C5EED7"
                    />
                    <path
                      d="M25 51.7222C25 56.5679 26.4369 61.3047 29.129 65.3337C31.8211 69.3627 35.6475 72.5029 40.1243 74.3573C44.601 76.2116 49.5272 76.6968 54.2797 75.7515C59.0322 74.8061 63.3977 72.4727 66.8241 69.0463C70.2505 65.62 72.5839 61.2545 73.5292 56.5019C74.4746 51.7494 73.9894 46.8233 72.135 42.3465C70.2807 37.8697 67.1405 34.0433 63.1115 31.3512C59.0825 28.6591 54.3456 27.2222 49.5 27.2222C43.0022 27.2222 36.7705 29.8035 32.1759 34.3981C27.5812 38.9928 25 45.2244 25 51.7222ZM69.6444 51.7222C69.6444 55.7064 68.463 59.6011 66.2495 62.9139C64.036 66.2266 60.8899 68.8086 57.2089 70.3333C53.528 71.858 49.4777 72.2569 45.57 71.4796C41.6624 70.7023 38.073 68.7837 35.2557 65.9665C32.4385 63.1493 30.5199 59.5599 29.7426 55.6522C28.9653 51.7446 29.3643 47.6942 30.889 44.0133C32.4136 40.3324 34.9956 37.1862 38.3083 34.9727C41.6211 32.7592 45.5158 31.5778 49.5 31.5778C54.8404 31.585 59.9601 33.7097 63.7363 37.4859C67.5126 41.2622 69.6372 46.3818 69.6444 51.7222Z"
                      fill="#C5EED7"
                    />
                    <path
                      d="M26.008 34.9261C26.008 34.3485 25.7786 33.7946 25.3702 33.3862C24.9618 32.9778 24.4078 32.7483 23.8303 32.7483H17.2969C16.7193 32.7483 16.1654 32.9778 15.757 33.3862C15.3486 33.7946 15.1191 34.3485 15.1191 34.9261C15.1191 35.5037 15.3486 36.0576 15.757 36.466C16.1654 36.8744 16.7193 37.1039 17.2969 37.1039H23.8303C24.4078 37.1039 24.9618 36.8744 25.3702 36.466C25.7786 36.0576 26.008 35.5037 26.008 34.9261Z"
                      fill="#C5EED7"
                    />
                    <path
                      d="M34.0922 51.7222C34.1228 54.5933 34.968 57.3966 36.5294 59.8062C38.0907 62.2157 40.3042 64.1324 42.9122 65.3333L45.2261 61.6039C43.6673 61.0819 42.2469 60.2137 41.0715 59.0645C39.8961 57.9152 38.9962 56.5148 38.4392 54.9682C37.8822 53.4216 37.6826 51.7689 37.8554 50.1341C38.0282 48.4994 38.5688 46.9249 39.4369 45.5289C40.3049 44.1329 41.4777 42.9516 42.8674 42.0735C44.2571 41.1953 45.8275 40.6433 47.461 40.4586C49.0945 40.274 50.7485 40.4616 52.2992 41.0074C53.8498 41.5532 55.2567 42.443 56.4144 43.61L58.7555 39.8533C56.5269 38.0477 53.8312 36.9125 50.9823 36.5799C48.1333 36.2474 45.2486 36.7312 42.664 37.9749C40.0795 39.2187 37.9015 41.1713 36.3839 43.6052C34.8663 46.0391 34.0716 48.8541 34.0922 51.7222Z"
                      fill="#C5EED7"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_3963_59332">
                      <rect
                        width="98"
                        height="98"
                        fill="white"
                        transform="translate(0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </label>
              <div className="regular-14 text-color-secondary">
                Đăng từ 1 tới 5 hình
              </div>
            </div>
          </div>
          <div className="upload-videos d-flex justify-content-center align-items-center">
            <div className="upload-button d-flex flex-column align-items-center gap-2">
              <input type="file" id="upload-videos" className="d-none" />
              <label htmlFor="upload-videos">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="88"
                  height="63"
                  viewBox="0 0 88 63"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M53.3789 0H15.8789C11.7349 0 7.76062 1.6462 4.83036 4.57646C1.90011 7.50671 0.253906 11.481 0.253906 15.625V46.875C0.253906 51.019 1.90011 54.9933 4.83036 57.9235C7.76062 60.8538 11.7349 62.5 15.8789 62.5H53.3789C57.5229 62.5 61.4972 60.8538 64.4275 57.9235C67.3577 54.9933 69.0039 51.019 69.0039 46.875V15.625C69.0039 11.481 67.3577 7.50671 64.4275 4.57646C61.4972 1.6462 57.5229 0 53.3789 0ZM6.50391 15.625C6.50391 13.1386 7.49163 10.754 9.24978 8.99587C11.0079 7.23772 13.3925 6.25 15.8789 6.25H53.3789C55.8653 6.25 58.2499 7.23772 60.008 8.99587C61.7662 10.754 62.7539 13.1386 62.7539 15.625V46.875C62.7539 49.3614 61.7662 51.746 60.008 53.5041C58.2499 55.2623 55.8653 56.25 53.3789 56.25H15.8789C13.3925 56.25 11.0079 55.2623 9.24978 53.5041C7.49163 51.746 6.50391 49.3614 6.50391 46.875V15.625Z"
                    fill="#C5EED7"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M82.9291 6.75003L64.3166 18.8563C63.8842 19.1366 63.5277 19.5196 63.2791 19.971C63.0305 20.4225 62.8974 20.9284 62.8916 21.4438L62.7229 37.7688C62.7165 38.2952 62.8432 38.8147 63.0912 39.2791C63.3392 39.7434 63.7006 40.1376 64.1416 40.425L82.9166 52.625C83.3882 52.9324 83.9341 53.1066 84.4966 53.1294C85.059 53.1522 85.6172 53.0226 86.1121 52.7543C86.607 52.4861 87.0202 52.0891 87.3081 51.6054C87.5961 51.1217 87.748 50.5692 87.7479 50.0063V9.37503C87.7491 8.81158 87.598 8.25828 87.3105 7.77369C87.0231 7.28909 86.6099 6.89124 86.1148 6.62224C85.6197 6.35324 85.0611 6.2231 84.4981 6.2456C83.9351 6.26809 83.3887 6.44238 82.9166 6.75003M81.5041 44.25L68.9979 36.1188L69.1291 23.1813L81.5041 15.1375V44.25Z"
                    fill="#C5EED7"
                  />
                </svg>
              </label>
              <div className="regular-14 text-color-secondary">
                Đăng tối đa 1 video
              </div>
            </div>
          </div>
        </Form>
        <Form
          className="detail col-8 d-flex flex-column gap-4"
          onSubmit={handleSubmit}
        >
          <select
            className="list-of-postings form-select"
            aria-label="Default select example"
          >
            <option value="0" disabled>
              Danh mục tin đăng
            </option>
            <option value="1">Thời trang nam</option>
            <option value="2">Thời trang nữ</option>
            <option value="3">Giày dép</option>
            <option value="4">Phụ kiện & Trang sức</option>
            <option value="5">Mỹ phẩm</option>
            <option value="6">Đồ điện tử</option>
            <option value="7">Đồ gia dụng</option>
            <option value="8">Nội thất</option>
            <option value="9">Sách</option>
            <option value="10">Văn phòng phẩm</option>
            <option value="11">Giải trí</option>
            <option value="12">Thể thao</option>
          </select>
          <div className="info_details d-flex flex-column gap-2">
            <div className="semibold-20 text-color-quaternary">
              Thông tin chi tiết
            </div>
            <div className="regular-12">Tình trạng</div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
              />
              <label className="form-check-label" htmlFor="inlineRadio1">
                Đã sử dụng
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio2"
                value="option2"
              />
              <label className="form-check-label" htmlFor="inlineRadio2">
                Mới
              </label>
            </div>
            <div className="mb-3">
              <input
                className="form-control regular-14"
                id="exampleFormControlInput1"
                placeholder="Loại sản phẩm"
              />
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label regular-12"
                htmlFor="flexCheckDefault"
              >
                Tôi muốn cho tặng miễn phí
              </label>
            </div>
            <Form.Group controlId="formProductSuggestedPrice" className="mb-3">
              <Form.Control
                className="form-control regular-14"
                type="number"
                required
                placeholder="Giá đề xuất"
                value={product.suggestedPrice}
                onChange={e =>
                  setProduct({...product, suggestedPrice: e.target.value})
                }
              />
            </Form.Group>
          </div>

          <div className="title-and-description d-flex flex-column gap-2">
            <div className="post_title_detail semibold-20 text-color-quaternary">
              Tiêu đề Tin đăng và Mô tả chi tiết
            </div>
            <Form.Group controlId="formProductTitle">
              <Form.Control
                className="mb-3 regular-14"
                type="text"
                required
                placeholder="Tiêu đề tin đăng"
                value={product.title}
                onChange={e => setProduct({...product, title: e.target.value})}
              ></Form.Control>
            </Form.Group>
            <div className="mb-3">
              <textarea
                className="form-control regular-14"
                id="exampleFormControlTextarea1"
                rows={3}
                placeholder="Mô tả chi tiết"
              ></textarea>
            </div>
          </div>
          <div className="address d-flex flex-column gap-2">
            <div className="semibold-20 text-color-quaternary">
              Thông tin người bán
            </div>
            <Form.Group controlId="formProductAddress" className="mb-3">
              <Form.Control
                className="form-control regular-14 clickable"
                placeholder="Địa chỉ"
                required
                readOnly
                onClick={() =>
                  showModal(AddressFormModal, handleAddressFormModalSubmit)
                }
                value={
                  product.addressDetail
                    ? `${product.addressDetail}, ${fullName}`
                    : ''
                }
              />
            </Form.Group>
          </div>
          <div className="summit d-flex justify-content-between">
            <AppButton className="preview" style={'secondary'}>
              Xem trước
            </AppButton>
            <AppButton className="submit" type="submit" style={'primary'}>
              Đăng tin
            </AppButton>
          </div>
        </Form>
      </div>
    </div>
  );
}
