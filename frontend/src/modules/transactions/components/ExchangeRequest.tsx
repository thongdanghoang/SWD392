import './ExchangeRequest.scss';
import React, {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../shared/services/application.service.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {ProductWithOwnerDTO} from '../../homepage/model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../../shared/app-routing.constants.ts';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
import {formatToVietnameseCurrency} from '../../shared/utils.ts';
import {getWardByCode} from 'vn-local-plus';
import {useModal} from '../../shared/components/modal/useModal.tsx';
import {ExchangeProductConfirmationModal} from './ExchangeProductConfirmationModal.tsx';

interface ExchangeRequestDto {
  productId: string;
  exchangeByMoney: boolean;
  productToExchangeId?: string;
}

export default function ExchangeRequest(): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const [confirmExchange, setConfirmExchange] = useState<boolean>(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  useEffect(() => {
    applicationService.checkIsUserDoActionOrElseNavigateLoginPage(() => {});
  }, []);

  const [confirm, setConfirm] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  );
  const handleProductChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.checked) {
      setSelectedProducts([...selectedProducts, event.target.value]);
    } else {
      setSelectedProducts(
        selectedProducts.filter(productId => productId !== event.target.value)
      );
    }
  };

  // Fetch product detail by id
  const currentProductId = useParams<{id: string}>().id;
  const [currentProduct, setCurrentProduct] =
    useState<ProductWithOwnerDTO | null>(null);
  useEffect((): void => {
    if (currentProductId) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${currentProductId}`)
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
  }, [currentProductId]);

  // Fetch my products
  const [myProducts, setMyProducts] = useState<ProductWithOwnerDTO[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.MY_PRODUCTS_CAN_BE_EXCHANGE_PATH)
        .then(response => {
          setMyProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);

  const handleExchangeRequestByMoney = (): void => {
    if (currentProductId) {
      const exchangeRequest: ExchangeRequestDto = {
        productId: currentProductId,
        exchangeByMoney: true
      };
      applicationService
        .createApiClient()
        .post(AppRoutingConstants.EXCHANGE_REQUESTS_PATH, exchangeRequest)
        .then(response => {
          navigate(`/exchange-detail/${response.data.id}`);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const modalContext = useModal();
  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  const handleExchangeRequestByProducts = (): void => {
    applicationService
      .createApiClient()
      .post(AppRoutingConstants.EXCHANGE_REQUESTS_PATH, {
        productId: currentProductId,
        exchangeByMoney: false,
        productsToExchangeId: selectedProducts
      })
      .then(response => {
        navigate(`/exchange-detail/${response.data.id}`);
      })
      .catch(error => {
        console.error(error);
      });
  };
  const getDifferentPrice = (): string => {
    const totalPriceOfSelectedProducts: number = myProducts
      .filter((product: ProductWithOwnerDTO) =>
        selectedProducts.includes(product.id)
      )
      .reduce(
        (total: number, product: ProductWithOwnerDTO) =>
          total + (product.suggestedPrice ? Number(product.suggestedPrice) : 0),
        0
      );
    return currentProduct
      ? formatToVietnameseCurrency(
          totalPriceOfSelectedProducts - currentProduct.suggestedPrice
        )
      : 'không hợp lệ';
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
                src={currentProduct?.images[0]}
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
                {currentProduct &&
                  `${currentProduct.addressDetail}, ${getWardByCode(currentProduct.wardCode).fullName}`}
              </div>
            </div>
          </div>
        </div>
        <div className="form-check d-flex gap-2 align-items-center">
          <input
            className="form-check-input mt-0"
            type="checkbox"
            value="confirm"
            onChange={() => setConfirmExchange(!confirmExchange)}
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
            {myProducts?.map((product: ProductWithOwnerDTO) => (
              <label
                key={product.id}
                className={`my-product-item d-flex align-items-center clickable ${selectedProducts.includes(product.id) ? 'selected' : ''}`}
              >
                <div className="product-detail flex-1 d-flex gap-3 align-items-center">
                  <img
                    className={'product-image'}
                    src={product.images[0]}
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
                    className="form-check-input"
                    type="checkbox"
                    id={`product-${product.id}`}
                    name="product"
                    value={product.id}
                    onChange={handleProductChange}
                  />
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
            disabled={!confirmExchange}
            onClick={handleExchangeRequestByMoney}
          >
            Giao dịch bằng tiền
          </AppButton>
          <AppButton
            className="button"
            variant={'primary'}
            disabled={!confirmExchange || selectedProducts.length === 0}
            onClick={() =>
              showModal(
                ExchangeProductConfirmationModal,
                handleExchangeRequestByProducts,
                () => {},
                {differentPrice: getDifferentPrice()}
              )
            }
          >
            Giao dịch bằng sản phẩm
          </AppButton>
        </div>
      </div>
    </div>
  );
}
