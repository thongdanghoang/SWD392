import './ExchangeRequest.scss';
import React, {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../shared/services/application.service.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {ProductDTO} from '../../homepage/model/productDto.ts';
import {AppRoutingConstants} from '../../shared/app-routing.constants.ts';
import AppButton from '../../shared/components/buttons/AppButton.tsx';

interface ExchangeRequestDto {
  productId: string;
  exchangeByMoney: boolean;
  productToExchangeId?: string;
}

export default function ExchangeRequest(): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const [confirm, setConfirm] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProductId(event.target.value);
  };

  // Fetch product detail by id
  const {id} = useParams<{id: string}>();
  const [currentProduct, setCurrentProduct] = useState<ProductDTO | null>(null);
  useEffect((): void => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          setCurrentProduct({
            ...response.data.data,
            imageUrl:
              'https://binhminhdigital.com/storedata/images/product/canon-eos-4000d-kit-1855mm-f3556-iii-den.jpg'
          });
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // Fetch my products
  const [myProducts, setMyProducts] = useState<ProductDTO[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.MY_PRODUCTS_PATH)
        .then(response => {
          setMyProducts(
            response.data.data.map((product: ProductDTO) => ({
              ...product,
              imageUrl:
                'https://binhminhdigital.com/storedata/images/product/canon-eos-4000d-kit-1855mm-f3556-iii-den.jpg'
            })) ?? []
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

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

  const handleExchangeRequestByMoney = (): void => {
    if (id) {
      const exchangeRequest: ExchangeRequestDto = {
        productId: id,
        exchangeByMoney: true
      };
      applicationService
        .createApiClient()
        .post(AppRoutingConstants.EXCHANGE_REQUESTS_PATH, exchangeRequest)
        .then((): void => {
          navigate(AppRoutingConstants.HOMEPAGE);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleExchangeRequestByProduct = (): void => {
    if (id && selectedProductId) {
      const exchangeRequest: ExchangeRequestDto = {
        productId: id,
        exchangeByMoney: false,
        productToExchangeId: selectedProductId
      };
      applicationService
        .createApiClient()
        .post(AppRoutingConstants.EXCHANGE_REQUESTS_PATH, exchangeRequest)
        .then((): void => {
          navigate(
            `/exchange-detail/${currentProduct?.id}/${selectedProductId}`
          );
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div className="container my-5 d-flex gap-4 flex-column">
      <div className="exchange-info d-flex flex-column gap-3">
        <div className="title semibold-20 text-color-tertiary">
          Thông báo giao dịch
        </div>
        <div className="request-info d-flex justify-content-between align-items-center flex-column flex-xxl-row flex-xl-row flex-lg-row">
          <div className="product-detail d-flex gap-3">
            <div className="product-image">
              <img
                src={currentProduct?.imageUrl}
                alt="product"
                width={70}
                height={70}
              />
            </div>
            <div className="d-flex flex-column justify-content-center gap-1">
              <div className="title semibold-16 text-color-quaternary">
                {currentProduct?.title}
              </div>
              <div className="owner-full-name regular-12 text-color-tertiary">
                {`Được đăng bởi ${currentProduct?.owner?.firstName} ${currentProduct?.owner?.lastName}`}
              </div>
            </div>
          </div>
          <div className="price semibold-20 text-color-tertiary">
            {formatToVietnameseCurrency(currentProduct?.suggestedPrice)}
          </div>
          <div className="owner d-flex flex-column gap-2">
            <div className="phone-number d-flex gap-1">
              <div className="label semibold-14 text-color-quaternary">
                {'Số điện thoại:'}
              </div>
              <div className="value regular-14 text-color-tertiary">
                0987 456 789
              </div>
            </div>
            <div className="address d-flex gap-1">
              <div className="label semibold-14 text-color-quaternary">
                {'Địa chỉ:'}
              </div>
              <div className="value regular-14 text-color-tertiary">
                Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
              </div>
            </div>
          </div>
        </div>
        <div className="form-check d-flex gap-2 align-items-center">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            value="confirm"
            onChange={() => setConfirm(!confirm)}
            id="flexCheckDefault"
          />
          <label
            className="form-check-label regular-12 text-color-quaternary clickable"
            htmlFor="flexCheckDefault"
          >
            Tôi xác nhận sẽ giao dịch sản phẩm này với người dùng này.
          </label>
        </div>
      </div>
      <div className="select-products semibold-20 text-color-tertiary d-flex flex-column gap-3">
        <div className="title">Chọn sản phẩm để giao dịch</div>
        <div className="search d-flex align-items-center gap-2 px-3 col-12 col-xxl-6 col-xl-6 col-lg-6">
          <div className="search-btn clickable">
            <i className="search-icon bi bi-search"></i>
          </div>
          <input
            className="search-bar regular-14"
            type="text"
            placeholder="Search"
          />
        </div>
        {myProducts.length > 0 && (
          <div className="my-products d-flex flex-column justify-content-start p-3 gap-3">
            {myProducts?.map((product: ProductDTO) => (
              <label
                key={product.id}
                className={`my-product-item d-flex align-items-center clickable ${selectedProductId === product.id ? 'selected' : ''}`}
              >
                <div className="product-detail flex-1 d-flex gap-3 align-items-center">
                  <img
                    className={'product-image'}
                    src={product.imageUrl}
                    alt="product"
                    width={70}
                    height={70}
                  />
                  <div className="semibold-16 text-color-quaternary">
                    {product.title}
                  </div>
                </div>
                <div className="price flex-1 semibold-20 text-color-quaternary">
                  {formatToVietnameseCurrency(product.suggestedPrice)}
                </div>
                <div className="form-check me-3">
                  <input
                    className="form-check-input d-none" // Hide the default radio button
                    type="radio"
                    id={`product-${product.id}`}
                    name="product"
                    value={product.id}
                    onChange={handleProductChange}
                  />
                  <label
                    className="form-check-label d-flex align-items-center"
                    htmlFor={`product-${product.id}`}
                  >
                    <span className="custom-radio me-2">
                      <span className="inner"></span>
                    </span>
                  </label>
                </div>
              </label>
            ))}
          </div>
        )}
        {myProducts.length === 0 && (
          <div className="my-products d-flex justify-content-center align-items-center">
            <div className="regular-14 text-color-quaternary">
              Bạn chưa có sản phẩm nào để giao dịch
            </div>
          </div>
        )}
        <div className="actions d-flex justify-content-end gap-5">
          <AppButton
            className="button"
            variant={'secondary'}
            onClick={() => navigate(AppRoutingConstants.POST_PRODUCT)}
          >
            Thêm sản phẩm
          </AppButton>
          <AppButton
            className="button"
            variant={'primary'}
            disabled={!confirm}
            onClick={handleExchangeRequestByMoney}
          >
            Giao dịch bằng tiền
          </AppButton>
          <AppButton
            className="button"
            variant={'primary'}
            disabled={!confirm || !selectedProductId}
            onClick={handleExchangeRequestByProduct}
            // onClick={() => navigate(`/exchange-detail/${currentProduct?.id}`)}
          >
            Giao dịch bằng sản phẩm
          </AppButton>
        </div>
      </div>
    </div>
  );
}
