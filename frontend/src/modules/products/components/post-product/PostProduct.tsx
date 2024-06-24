import './PostProduct.scss';
import '@assets/styles/styles.scss';
import { Form } from 'react-bootstrap';
import React, { ReactElement } from 'react';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import AddressFormModal, { AddressDto } from '../AddressFormModal.tsx';
import { useApplicationService } from '../../../shared/services/application.service.ts';
import { AppRoutingConstants } from '../../../shared/app-routing.constants.ts';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../../shared/components/modal/useModal.tsx';
import UploadWidget from './UploadWidget.tsx';
import UploadWidgetVideo from './UploadVideo.tsx';

interface ProductDTO extends AddressDto {
  title: string;
  suggestedPrice: string;
  images: string[];
  video: string;
  origin: string;
  description: string;
}

export default function PostProduct(): ReactElement {
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const [fullName, setFullName] = React.useState<string>('');
  const [product, setProduct] = React.useState<ProductDTO>({
    title: '',
    origin: '',
    description: '',
    suggestedPrice: '',
    provinceCode: '',
    districtCode: '',
    wardCode: '',
    addressDetail: '',
    images: [],
    video: ''
  });
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
  const handleUploadComplete = (imageUrls: string[]): void => {
    setProduct({ ...product, images: imageUrls });
  };
  const handleUploadVideoComplete = (videoUrl: string): void => {
    setProduct({ ...product, video: videoUrl });
  };
  const [showSuggestedPrice, setShowSuggestedPrice] = React.useState(true);

  return (
    <div className="container my-5 needs-valida was-validated">
      <div className="row mb-3">
        <div className="col-4">
          <div className="semibold-20 text-color-quaternary">
            Hình ảnh và video sản phẩm
          </div>
        </div>
      </div>
      <Form className="row"  onSubmit={handleSubmit}>
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
        <div className="detail col-8 d-flex flex-column gap-2">
          <div>
            <div className="semibold-20 text-color-quaternary">Danh mục<span className='text-danger'>*</span></div>
            <select
              className="list-of-postings form-select"
              aria-label="Default select example"
              required
            >
              <option value="" disabled selected>
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
            <div className="invalid-feedback">
              Hãy chọn 1 danh mục.
            </div>
          </div>
          <div className="info_details d-flex flex-column gap-2">
            <div className="semibold-20 text-color-quaternary">
              Thông tin chi tiết<span className='text-danger'>*</span>
            </div>
            <div className="regular-12">Tình trạng</div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                id="inlineRadio1"
                value="option1"
                required
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
            <Form.Group controlId="formProductOrigin" className="mb-3">
              <Form.Control
                required
                type="text"
                placeholder="Xuất xứ"
                value={product.origin}
                onChange={e =>
                  setProduct({ ...product, origin: e.target.value })
                }
              />
            </Form.Group>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => setShowSuggestedPrice(!showSuggestedPrice)}
              />
              <label
                className="form-check-label regular-12"
                htmlFor="flexCheckDefault"
                id='free-giveaway'
              >
                Tôi muốn cho tặng miễn phí
              </label>
            </div>
            {showSuggestedPrice &&
              <Form.Group controlId="formProductSuggestedPrice" className="mb-3">
                <Form.Control
                  className="form-control regular-14"
                  type="number"
                  min={1000}
                  required
                  placeholder="Giá đề xuất(Tối thiểu 1000 đồng)"
                  value={product.suggestedPrice}
                  onChange={e =>
                    setProduct({ ...product, suggestedPrice: e.target.value })
                  }
                />
              </Form.Group>}
          </div>

          <div className="title-and-description d-flex flex-column gap-2">
            <div className="post_title_detail semibold-20 text-color-quaternary">
              Tiêu đề Tin đăng và Mô tả chi tiết<span className='text-danger'>*</span>
            </div>
            <Form.Group controlId="formProductTitle">
              <Form.Control
                className="mb-3 regular-14"
                type="text"
                required
                placeholder="Tiêu đề tin đăng"
                value={product.title}
                onChange={e => setProduct({ ...product, title: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Control
                className="mb-3 regular-14"
                as={'textarea'}
                rows={3}
                required
                placeholder="Mô tả chi tiết"
                value={product.description}
                onChange={e => setProduct({ ...product, description: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <div className="address d-flex flex-column gap-2">
              <div className="semibold-20 text-color-quaternary">
                Thông tin người bán<span className='text-danger'>*</span>
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
