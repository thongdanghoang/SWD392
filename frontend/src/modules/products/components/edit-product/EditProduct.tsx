import './EditProduct.scss';
import '@assets/styles/styles.scss';
import {Form} from 'react-bootstrap';
import React, {useContext, useEffect, useState} from 'react';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import AddressFormModal from '../AddressFormModal.tsx';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {useModal} from '../../../shared/components/modal/useModal.tsx';
import UploadWidget from '../UploadWidget.tsx';
import {UserDto} from '../../../shared/models/userDto.ts';
import {UserContext} from '../../../shared/services/userContext.ts';
import {getWardByCode} from 'vn-local-plus';
import {ProductDTO} from '../../models/product.dto.ts';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO.ts';
import UploadWidgetVideo from '../post-product/UploadVideo.tsx';

export default function EditProduct(): React.ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  const {id} = useParams<{id: string}>();
  const [version, setVersion] = React.useState<number>(0);
  useState<ProductWithOwnerDTO | null>(null);
  useEffect(() => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          setVersion(response.data.data.version);
          setProduct({
            title: response.data.data.title,
            isGiveAway: response.data.data.isGiveAway,
            isUsed: response.data.data.isUsed,
            suggestedPrice: response.data.data.suggestedPrice,
            provinceCode: response.data.data.provinceCode,
            districtCode: response.data.data.districtCode,
            wardCode: response.data.data.wardCode,
            addressDetail: response.data.data.addressDetail,
            images: response.data.data.images,
            video: response.data.data.video,
            category: response.data.data.category,
            summary: response.data.data.summary
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [id]);
  const [imageErrorMessage, setImageErrorMessage] = React.useState<string>('');
  const [fullAddressName, setFullAddressName] = React.useState<string>('');
  const [product, setProduct] = React.useState<ProductDTO>({
    title: '',
    isGiveAway: false,
    isUsed: false,
    suggestedPrice: 0,
    provinceCode: '',
    districtCode: '',
    wardCode: '',
    addressDetail: '',
    images: [],
    video: '',
    category: '',
    summary: ''
  });
  useEffect((): void => {
    if (currentUser?.addressDetail) {
      setFullAddressName(getWardByCode(currentUser.wardCode).fullName);
    }
  }, [currentUser]);
  const [validated, setValidated] = React.useState(false);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (product.images.length === 0) {
      setImageErrorMessage('Vui lòng tải lên ít nhất 1 hình ảnh');
    }
    if (form.checkValidity() && product.images.length > 0) {
      applicationService
        .createApiClient()
        .put(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`, {
          ...product,
          id,
          version
        })
        .then((): void => {
          navigate(`${AppRoutingConstants.HOMEPAGE}`);
        })
        .catch((error: any) => console.error(error));
    }
    setValidated(true);
  };
  const modalContext = useModal();
  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  const handleAddressFormModalSubmit = (data: any): void => {
    setFullAddressName(data.fullName);
    setProduct({
      ...product,
      provinceCode: data.provinceCode,
      districtCode: data.districtCode,
      wardCode: data.wardCode,
      addressDetail: data.addressDetail
    });
  };
  const handleUploadComplete = (imageUrls: string[]): void => {
    setProduct(prevProduct => ({...prevProduct, images: imageUrls}));
  };

  const handleUploadVideoComplete = (videoUrl: string): void => {
    setProduct(prevProduct => ({...prevProduct, video: videoUrl}));
  };

  return (
    <div className="container my-5">
      <div className="row ">
        <div className="col-4">
          <div className="semibold-20 text-color-quaternary">
            Hình ảnh và video sản phẩm
          </div>
        </div>
      </div>
      <Form
        className="row"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="upload col-4 gap-3 d-flex flex-column">
          {product.images.length > 0 && (
            <div className="row images d-flex p-3">
              {product.images.map((url: string, index: number) => (
                <div className="col-4" key={index}>
                  <img src={url} alt="Uploaded" className="img-fluid" />
                </div>
              ))}
            </div>
          )}
          {imageErrorMessage && product.images.length === 0 && (
            <div className="alert alert-danger mb-0 mt-4" role="alert">
              {imageErrorMessage}
            </div>
          )}
          {product.images.length < 5 && product.images.length > 0 && (
            <div className="upload-images d-flex justify-content-center align-items-center">
              <div className="row">
                <UploadWidget
                  onUploadComplete={handleUploadComplete}
                  urls={product.images}
                />
              </div>
            </div>
          )}
          {product.video && (
            <div className="product-video">
              <video src={product.video} controls className="img-fluid"></video>
            </div>
          )}
          {!product.video && (
            <div className="upload-videos d-flex justify-content-center align-items-center">
              <div className="row">
                <UploadWidgetVideo
                  onUploadVideoComplete={handleUploadVideoComplete}
                />
              </div>
            </div>
          )}
        </div>
        <div className="detail col-8 d-flex flex-column gap-4">
          <Form.Group controlId="formCategory">
            <Form.Control
              as="select"
              required
              className="list-of-postings form-select semibold-16 text-color-tertiary"
              // value={product.category}
              // onChange={e => setProduct({...product, category: e.target.value})}
            >
              <option value="1">Thời trang nam</option>
              <option value="2">Thời trang nữ</option>
              <option value="3">Giày dép</option>
              <option value="4">Phụ kiện & Trang sức</option>
              <option value="5">Mỹ phẩm</option>
              <option value="6">Đồ điện tử</option>
              <option value="7">Đồ gia dụng</option>
              <option value="8">Đồ chơi</option>
              <option value="9">Đồ dùng sinh hoạt</option>
              <option value="10">Sách</option>
              <option value="11">Thú cưng</option>
              <option value="12">Văn phòng phẩm</option>
              <option value="13">Thực phẩm</option>
              <option value="14">Khác</option>
            </Form.Control>
          </Form.Group>
          <div className="info_details d-flex flex-column gap-3">
            <div className="semibold-20 text-color-quaternary">
              Thông tin chi tiết
            </div>
            <div className="regular-12 text-color-tertiary">Tình trạng</div>
            <div className="product-status">
              <Form.Group>
                <Form.Check
                  inline
                  className="semibold-16 text-color-tertiary"
                  label="Đã sử dụng"
                  name="inlineRadioOptions"
                  type="radio"
                  id="inlineRadio1"
                  value="used"
                  checked={product.isUsed}
                  onChange={(): void => {
                    setProduct({...product, isUsed: true});
                  }}
                  required
                />
                <Form.Check
                  inline
                  className="semibold-16 text-color-tertiary"
                  label="Mới"
                  name="inlineRadioOptions"
                  type="radio"
                  id="inlineRadio2"
                  value="new"
                  checked={!product.isUsed}
                  onChange={(): void => {
                    setProduct({...product, isUsed: false});
                  }}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please select an option.
                </Form.Control.Feedback>
              </Form.Group>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                checked={product.isGiveAway}
                onChange={(): void => {
                  if (product.isGiveAway) {
                    setProduct({
                      ...product,
                      isGiveAway: false,
                      suggestedPrice: 0
                    });
                  } else {
                    setProduct({
                      ...product,
                      isGiveAway: true,
                      suggestedPrice: 0
                    });
                  }
                }}
              />
              <label
                className="form-check-label regular-12 text-color-tertiary"
                htmlFor="flexCheckDefault"
              >
                Tôi muốn cho tặng miễn phí
              </label>
            </div>
            <Form.Group controlId="formProductSuggestedPrice" className="">
              <Form.Control
                className="form-control regular-14 text-color-tertiary"
                type="number"
                required
                placeholder="Giá đề xuất"
                min={10000}
                disabled={product.isGiveAway}
                value={product.suggestedPrice}
                onChange={e =>
                  setProduct({
                    ...product,
                    suggestedPrice: Number(e.target.value)
                  })
                }
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập giá đề xuất từ 10.000đ trở lên
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="title-and-description d-flex flex-column gap-3">
            <div className="post_title_detail semibold-20 text-color-quaternary">
              Tiêu đề tin đăng và Mô tả chi tiết
            </div>
            <Form.Group controlId="formProductTitle">
              <Form.Control
                className=" regular-14 text-color-tertiary"
                type="text"
                required
                placeholder="Tiêu đề tin đăng"
                value={product.title}
                onChange={e => setProduct({...product, title: e.target.value})}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập tiêu đề tin đăng
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Control
                className=" regular-14 text-color-tertiary"
                as="textarea"
                rows={3}
                required
                placeholder="Mô tả chi tiết"
                onChange={e =>
                  setProduct({...product, summary: e.target.value})
                }
                value={product.summary}
              ></Form.Control>
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập mô tả
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="address d-flex flex-column gap-3">
            <div className="semibold-20 text-color-quaternary">
              Thông tin người bán
            </div>
            <Form.Group controlId="formProductAddress" className="">
              <Form.Control
                className="form-control regular-14 text-color-tertiary clickable"
                placeholder="Địa chỉ"
                required
                onClick={() =>
                  showModal(
                    AddressFormModal,
                    handleAddressFormModalSubmit,
                    () => {},
                    currentUser
                  )
                }
                value={
                  product.addressDetail
                    ? `${product.addressDetail}, ${fullAddressName}`
                    : ''
                }
                onChange={(): void => {}}
              />
              <Form.Control.Feedback type="invalid">
                Vui lòng nhập địa chỉ
              </Form.Control.Feedback>
            </Form.Group>
          </div>
          <div className="summit d-flex justify-content-end">
            <AppButton className="submit" type="submit" variant={'primary'}>
              Chỉnh sửa tin đăng
            </AppButton>
          </div>
        </div>
      </Form>
    </div>
  );
}
