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
    if (exchangeDetail) {
      exchangeDetail.productsToBeExchanged.forEach((productId: string) => {
        applicationService
          .createApiClient()
          .get(`${AppRoutingConstants.PRODUCTS_PATH}/${productId}`)
          .then(response => {
            setProductsToBeExchanged(prevState => [
              ...prevState,
              response.data.data
            ]);
          })
          .catch(error => {
            console.error(error);
          });
      });
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
                {productsToBeExchanged[0]?.isMyProduct
                  ? 'Bạn'
                  : `${productsToBeExchanged[0]?.owner?.firstName} ${productsToBeExchanged[0]?.owner?.lastName}`}
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
