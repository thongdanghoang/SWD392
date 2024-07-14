import './ExchangeDetail.scss';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useApplicationService} from '../../shared/services/application.service.ts';
import {ProductWithOwnerDTO} from '../../homepage/model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../../shared/app-routing.constants.ts';
import {
  ExchangeRequestDto,
  ExchangeStatusDto,
  getExchangeStatusText
} from '../models/model.ts';
import {formatToVietnameseCurrency} from '../../shared/utils.ts';
import {getWardByCode} from 'vn-local-plus';
import {UserDto} from '../../shared/models/userDto.ts';
import {UserContext} from '../../shared/services/userContext.ts';

export default function ExchangeDetail(): ReactElement {
  const navigate = useNavigate();
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const applicationService = useApplicationService();
  const exchangeDetailId = useParams<{id: string}>().id;
  const [exchangeDetail, setExchangeDetail] = useState<ExchangeRequestDto>();
  const [productsToBeExchanged, setProductsToBeExchanged] = useState<
    ProductWithOwnerDTO[]
  >([]);
  const [userRequestDto, setUserRequestDto] = useState<UserDto | null>(null);
  const [productTarget, setProductTarget] =
    useState<ProductWithOwnerDTO | null>(null);

  // fetch exchange detail by id
  useEffect((): void => {
    if (exchangeDetailId && currentUser) {
      applicationService
        .createApiClient()
        .get(
          `${AppRoutingConstants.EXCHANGE_REQUESTS_PATH}/${exchangeDetailId}`
        )
        .then(response => {
          if (response.data) {
            setExchangeDetail(response.data);
          } else {
            navigate(AppRoutingConstants.NOT_FOUND_PATH);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [exchangeDetailId, currentUser]);

  // after fetch exchange detail, we can fetch product will be exchanged
  useEffect((): void => {
    if (exchangeDetail) {
      applicationService
        .createApiClient()
        .get(
          `${AppRoutingConstants.PRODUCTS_PATH}/${exchangeDetail.productRequest}`
        )
        .then(response => {
          setProductTarget(response.data.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [exchangeDetail]);

  // and we fetch products request to exchange
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.USER_PATH}/${exchangeDetail?.userRequest}`)
        .then(response => setUserRequestDto(response.data))
        .catch(error => console.error(error));
    }
    if (
      exchangeDetail?.productsToBeExchanged &&
      exchangeDetail.productsToBeExchanged.length > 0
    ) {
      const fetchProductsPromises = exchangeDetail.productsToBeExchanged.map(
        productId =>
          applicationService
            .createApiClient()
            .get(`${AppRoutingConstants.PRODUCTS_PATH}/${productId}`)
      );
      Promise.all(fetchProductsPromises)
        .then(responses => {
          const fetchedProducts = responses.map(response => response.data.data);
          setProductsToBeExchanged(fetchedProducts);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      setProductsToBeExchanged([]);
    }
  }, [exchangeDetail]);

  const handleReject = (): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.EXCHANGE_REJECT_PATH}/${exchangeDetail?.id}`)
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  };
  const handleAccept = (): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.EXCHANGE_ACCEPT_PATH}/${exchangeDetail?.id}`)
      .then(() => window.location.reload())
      .catch(error => console.error(error));
  };

  return (
    <div className="container my-5 d-flex gap-4 flex-column exchange-detail">
      <div className=" d-flex flex-column">
        <div className="d-flex justify-content-start align-items-center gap-1 box">
          <div className="semibold-20 text-color-quaternary">
            Chi tiết giao dịch
          </div>
          <div className="bold-32 text-color-tertiary">
            <i className="bi bi-dot"></i>
          </div>
          <div className="regular-14 text-color-tertiary">
            Ngày bắt đầu:{' '}
            {exchangeDetail?.creationDate
              ? new Date(exchangeDetail.creationDate).toLocaleDateString()
              : ''}
          </div>
          <div className="bold-32 text-color-tertiary">
            <i className="bi bi-dot"></i>
          </div>
          <div className="regular-14 text-color-tertiary">
            Trạng thái: {getExchangeStatusText(exchangeDetail?.status)}
          </div>
        </div>
        <div className="exchange-information">
          <div className="box">
            <div className="title semibold-14 text-color-tertiary">
              Thông tin của người thực hiện giao dịch
            </div>
          </div>
          {/* Thông tin giao dịch */}
          <div className="d-flex">
            {/* thông tin người bán */}
            <div className="col-6 d-flex flex-column gap-3 seller-information">
              <div className="semibold-16 text-color-quaternary">
                {productTarget?.isMyProduct
                  ? `${userRequestDto?.firstName} ${userRequestDto?.lastName}`
                  : 'Bạn'}
              </div>
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
                  {productsToBeExchanged[0] &&
                    `${productsToBeExchanged[0].addressDetail}, ${getWardByCode(productsToBeExchanged[0].wardCode).fullName}`}
                </div>
              </div>

              <div className="d-flex flex-column gap-2">
                {productsToBeExchanged.map((product, index) => (
                  <div
                    key={index}
                    className="d-flex mt-2 clickable"
                    onClick={() => navigate(`/products/${product?.id}`)}
                  >
                    <div className="product-image">
                      <img
                        src={product.images[0]}
                        alt="product"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="flex-column ms-3 gap-1">
                      <div className="title bold-25 text-color-quaternary">
                        {product.title}
                      </div>
                      <div className="owner-full-name regular-14 text-color-quaternary text-color-tertiary">
                        {`Được đăng bởi `}
                        {product.isMyProduct
                          ? 'bạn'
                          : `${product.owner?.firstName} ${product.owner?.lastName}`}
                      </div>
                      <div className="price semibold-20 text-color-tertiary">
                        {product.isGiveAway
                          ? 'Tặng'
                          : formatToVietnameseCurrency(product.suggestedPrice)}
                      </div>
                    </div>
                  </div>
                ))}
                {productsToBeExchanged.length === 0 && (
                  <div className="d-flex mt-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      fill="#1F7343"
                      className="bi bi-coin"
                      viewBox="0 0 16 16"
                    >
                      <path d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518z" />
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11m0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12" />
                    </svg>
                    <div className="flex-column ms-3 gap-1">
                      <div className="title bold-25 text-color-quaternary">
                        Giao dịch bằng tiền
                      </div>
                      <div className="owner-full-name regular-14 text-color-quaternary text-color-tertiary">
                        {`Được đăng bởi `}
                        {productTarget?.isMyProduct
                          ? `${userRequestDto?.firstName} ${userRequestDto?.lastName}`
                          : 'bạn'}
                      </div>
                      <div className="price semibold-20 text-color-tertiary">
                        0 VNĐ
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Thông tin người mua */}
            <div className="col-6 d-flex flex-column gap-3 buyer-information">
              <div className="owner-full-name label bold-25 text-color-quaternary">
                {productTarget?.isMyProduct
                  ? 'Bạn'
                  : `${productTarget?.owner?.firstName} ${productTarget?.owner?.lastName}`}
              </div>
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
                  {productTarget &&
                    `${productTarget.addressDetail}, ${getWardByCode(productTarget.wardCode).fullName}`}
                </div>
              </div>
              <div
                className="d-flex mt-2 clickable"
                onClick={() => navigate(`/products/${productTarget?.id}`)}
              >
                <div className="product-image">
                  <img
                    src={productTarget?.images[0]}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-column ms-3 gap-1">
                  <div className="title bold-25 text-color-quaternary">
                    {productTarget?.title}
                  </div>
                  <div className="owner-full-name regular-14 text-color-quaternary text-color-tertiary">
                    {`Được đăng bởi `}
                    {productTarget?.isMyProduct
                      ? 'bạn'
                      : `${productTarget?.owner?.firstName} ${productTarget?.owner?.lastName}`}
                  </div>
                  <div className="price semibold-20 text-color-tertiary">
                    {productTarget?.isGiveAway
                      ? 'Tặng'
                      : formatToVietnameseCurrency(
                          productTarget?.suggestedPrice
                        )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {productTarget?.isMyProduct &&
            exchangeDetail?.status === ExchangeStatusDto.PENDING && (
              <div className="actions d-flex justify-content-end gap-5 mt-lg-4">
                <AppButton
                  className="button"
                  variant={'tertiary'}
                  onClick={handleReject}
                >
                  Từ chối giao dịch
                </AppButton>
                <AppButton
                  className="button"
                  variant={'secondary'}
                  onClick={handleAccept}
                >
                  Đồng ý giao dịch
                </AppButton>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
