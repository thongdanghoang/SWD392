import './PostProduct.scss';
import '@assets/styles/styles.scss';
import {Form} from 'react-bootstrap';
import React, {ReactElement, useEffect, useState} from 'react';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import AddressFormModal, {AddressDto} from '../AddressFormModal.tsx';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useNavigate} from 'react-router-dom';
import {useModal} from '../../../shared/components/modal/useModal.tsx';
import UploadWidget from './UploadWidget.tsx';
import UploadWidgetVideo from './UploadVideo.tsx';

interface ProductDTO extends AddressDto {
  title: string;
  suggestedPrice: string;
  images: string[];
  video: string;
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
    addressDetail: '',
    images: [],
    video: ''
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
  const handleUploadComplete = (imageUrls: string[]) => {
    setProduct({...product, images: imageUrls});
  };
  const handleUploadVideoComplete = (videoUrl: string) => {
    setProduct({...product, video: videoUrl});
  };
  useEffect(() => {}, [product]);

  return (
    <div className="container my-5">
      <div className="row mb-3">
        <div className="col-4">
          <div className="semibold-20 text-color-quaternary">
            Hình ảnh và video sản phẩm
          </div>
        </div>
      </div>
      <Form className="row" onSubmit={handleSubmit}>
        <div className="upload col-4 gap-3 d-flex flex-column">
          <div className="upload-images d-flex justify-content-center align-items-center">
            <UploadWidget onUploadComplete={handleUploadComplete} />
          </div>
          <div className="upload-videos d-flex justify-content-center align-items-center">
            <UploadWidgetVideo
              onUploadVideoComplete={handleUploadVideoComplete}
            />
          </div>
        </div>
        <div className="detail col-8 d-flex flex-column gap-4">
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
          </div>
          <div className="summit d-flex justify-content-between">
            <AppButton className="preview" variant={'secondary'}>
              Xem trước
            </AppButton>
            <AppButton className="submit" type="submit" variant={'primary'}>
              Đăng tin
            </AppButton>
          </div>
        </div>
      </Form>
    </div>
  );
}
