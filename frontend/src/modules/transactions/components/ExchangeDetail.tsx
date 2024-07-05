import './ExchangeDetail.scss';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
import {ReactElement, useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useApplicationService} from '../../shared/services/application.service.ts';
import {ProductWithOwnerDTO} from '../../homepage/model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../../shared/app-routing.constants.ts';
import {ExchangeRequestDto, getExchangeStatusText} from '../models/model.ts';
import {formatToVietnameseCurrency} from '../../shared/utils.ts';
import {getWardByCode} from 'vn-local-plus';

export default function ExchangeDetail(): ReactElement {
  // const navigate = useNavigate();
  const applicationService = useApplicationService();
  const exchangeDetailId = useParams<{id: string}>().id;
  const [exchangeDetail, setExchangeDetail] =
    useState<ExchangeRequestDto | null>(null);
  const [productsToBeExchanged, setProductsToBeExchanged] = useState<
    ProductWithOwnerDTO[]
  >([]);
  const [myProducts, setMyProducts] = useState<ProductWithOwnerDTO | null>(
    null
  );

  // fetch exchange detail by id
  useEffect((): void => {
    if (exchangeDetailId && applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.EXCHANGE_DETAIL_PATH}/${exchangeDetailId}`)
        .then(response => setExchangeDetail(response.data))
        .catch(error => {
          console.error(error);
        });
    }
  }, [exchangeDetailId, applicationService.isAuthenticated()]);

  // after fetch exchange detail, we can fetch product will be exchanged
  useEffect((): void => {
    if (exchangeDetail) {
      applicationService
        .createApiClient()
        .get(
          `${AppRoutingConstants.PRODUCTS_PATH}/${exchangeDetail.productRequest}`
        )
        .then(response => {
          setMyProducts(response.data.data);
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
                {`${productsToBeExchanged[0]?.owner?.firstName} ${productsToBeExchanged[0]?.owner?.lastName}`}
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
                  <div key={index} className="d-flex mt-2">
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
                        {`Được đăng bởi ${product.owner?.firstName} ${product.owner?.lastName}`}
                      </div>
                      <div className="price semibold-20 text-color-tertiary">
                        {formatToVietnameseCurrency(product.suggestedPrice)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Thông tin người mua */}
            <div className="col-6 d-flex flex-column gap-3 buyer-information">
              <div className="owner-full-name label bold-25 text-color-quaternary">
                {`Bạn`}
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
                  {myProducts &&
                    `${myProducts.addressDetail}, ${getWardByCode(myProducts.wardCode).fullName}`}
                </div>
              </div>
              <div className="d-flex mt-2">
                <div className="product-image">
                  <img
                    src={myProducts?.images[0]}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-column ms-3 gap-1">
                  <div className="title bold-25 text-color-quaternary">
                    {myProducts?.title}
                  </div>
                  <div className="owner-full-name regular-14 text-color-quaternary text-color-tertiary">
                    {`Được đăng bởi bạn`}
                  </div>
                  <div className="price semibold-20 text-color-tertiary">
                    {formatToVietnameseCurrency(myProducts?.suggestedPrice)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* button */}
          <div className="actions d-flex justify-content-end gap-5 mt-5">
            <AppButton className="button" variant={'tertiary'}>
              Trở về trang chủ
            </AppButton>
            <AppButton className="button" variant={'secondary'}>
              Tạo giao dịch
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
