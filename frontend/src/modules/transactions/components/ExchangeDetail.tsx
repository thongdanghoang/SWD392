import './ExchangeDetail.scss';
import {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../shared/services/application.service.ts';
import {useParams} from 'react-router-dom';
import {ProductDTO} from '../../homepage/model/productDto.ts';
import {AppRoutingConstants} from '../../shared/app-routing.constants.ts';
import AppButton from '../../shared/components/buttons/AppButton.tsx';
// import ProgressBar from 'react-bootstrap/ProgressBar';

export default function ExchangeDetail(): ReactElement {
  const applicationService = useApplicationService();

  // Fetch product detail by id
  const {id} = useParams<{id: string}>();
  const {secondId} = useParams<{secondId: string}>();
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
  const [myProducts, setMyProducts] = useState<ProductDTO | null>(null);
  useEffect((): void => {
    if (secondId) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${secondId}`)
        .then(response => {
          console.log(response);
          setMyProducts({
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
  }, [secondId]);

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

  return (
    <div className="container my-5 d-flex gap-4 flex-column exchange-detail">
      <div className=" d-flex flex-column">
        <div className="title label bold-25 text-color-quaternary halftop-box">
          Chi tiết giao dịch
        </div>
        <div className="halfbottom-box">
          <div className="halftop-box">
            <div className="title semibold-20 text-color-tertiary">
              Thông tin của người thực hiện giao dịch
            </div>
          </div>
          {/* Thông tin giao dịch */}
          <div className="d-flex">
            {/* thông tin người bán */}
            <div className="col-6 d-flex flex-column gap-3 halfleft-box">
              <div className="owner-full-name label bold-25 text-color-quaternary">
                {`${currentProduct?.owner?.firstName} ${currentProduct?.owner?.lastName}`}
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
                  Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
                </div>
              </div>

              <div className="d-flex mt-2">
                <div className="product-image">
                  <img
                    src={currentProduct?.imageUrl}
                    alt="product"
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex-column ms-3 gap-1">
                  <div className="title bold-25 text-color-quaternary">
                    {currentProduct?.title}
                  </div>
                  <div className="owner-full-name regular-14 text-color-quaternary text-color-tertiary">
                    {`Được đăng bởi ${currentProduct?.owner?.firstName} ${currentProduct?.owner?.lastName}`}
                  </div>
                  <div className="price semibold-20 text-color-tertiary">
                    {formatToVietnameseCurrency(currentProduct?.suggestedPrice)}
                  </div>
                </div>
              </div>
            </div>
            {/* Thông tin người mua */}
            <div className="col-6 d-flex flex-column gap-3 halfright-box">
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
                  Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
                </div>
              </div>
              <div className="d-flex mt-2">
                <div className="product-image">
                  <img
                    src={myProducts?.imageUrl}
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
          {/* Stepper */}
          {/* <div>
            <div className='d-flex'>
              <div className='d-flex flex-column'>
                <div> <i className="bi bi-check-circle-fill fs-1"></i></div>
                <div> Chấp nhận giao dịch</div>
              </div>
              <ProgressBar className='progress-bar-inline-1' />
              <div className='d-flex flex-column'>
                <div> Check mark</div>
                <div> Chấp nhận giao dịch</div>
              </div>
              <ProgressBar className='progress-bar-inline-2' />
              <div className='d-flex flex-column'>
                <div> Check mark</div>
                <div> Chấp nhận giao dịch</div>
              </div>
            </div>
          </div> */}
          {/* button */}
          <div className="actions d-flex justify-content-end gap-5 mt-5">
            <AppButton
              className="button"
              variant={'secondary'}
              // onClick={}
            >
              Chat với người giao dịch
            </AppButton>
            <AppButton
              className="button"
              variant={'tertiary'}
              // onClick={}
            >
              Hủy giao dịch
            </AppButton>
            <AppButton
              className="button"
              variant={'primary'}
              // onClick={}
            >
              Giao dịch thành công!
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
