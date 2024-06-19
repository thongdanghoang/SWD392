import './DetailPopup.scss';
import {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {useParams} from 'react-router-dom';
import {ProductDTO} from '../../../homepage/model/productDto.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';

export default function DetailPopup(): ReactElement {
  const applicationService = useApplicationService();

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
  const {myproductId} = useParams<{myproductId: string}>();
  const [myProducts, setMyProducts] = useState<ProductDTO | null>(null);
  useEffect((): void => {
    if (myproductId) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${myproductId}`)
        .then(response => {
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
  }, [myproductId]);

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
    <div className="">
      <div className="">
        <div className="d-flex">
          {/* Người muốn đổi */}
          <div className="d-flex flex-column gap-3">
            <div className="owner-full-name label semibold-20 text-color-quaternary">
              {`${myProducts?.owner?.firstName} ${myProducts?.owner?.lastName}`}
            </div>
            <div className="rating d-flex gap-3">
              <div className="rate-point semibold-16 text-color-quaternary">
                5.0
              </div>
              <div className="stars d-flex gap-1">
                <i className="bi bi-star-fill text-color-secondary start-custom"></i>
                <i className="bi bi-star-fill text-color-secondary"></i>
                <i className="bi bi-star-fill text-color-secondary"></i>
                <i className="bi bi-star-half text-color-secondary"></i>
                <i className="bi bi-star text-color-secondary"></i>
              </div>
              <div className="number-of-rates regular-14 text-color-quaternary">
                (10)
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
                <div className="regular-14 text-color-quaternary text-color-tertiary">
                  {`Được đẳng bởi: ${myProducts?.owner?.firstName} ${myProducts?.owner?.lastName}`}
                </div>
                <div className="price semibold-20 text-color-tertiary">
                  {formatToVietnameseCurrency(myProducts?.suggestedPrice)}
                </div>
              </div>
            </div>
          </div>
          {/* icon */}
          <div className="icon-custom">
            <i className="bi bi-repeat fs-5 text-color-tertiary"></i>
          </div>

          {/* Người bán */}
          <div className="d-flex flex-column gap-3">
            <div className="label semibold-20 text-color-quaternary">
              {`Bạn`}
            </div>
            <div className="rating d-flex gap-3">
              <div className="rate-point semibold-16 text-color-quaternary">
                5.0
              </div>
              <div className="stars d-flex gap-1">
                <i className="bi bi-star-fill text-color-secondary"></i>
                <i className="bi bi-star-fill text-color-secondary"></i>
                <i className="bi bi-star-fill text-color-secondary"></i>
                <i className="bi bi-star-half text-color-secondary"></i>
                <i className="bi bi-star text-color-secondary"></i>
              </div>
              <div className="number-of-rates regular-14 text-color-quaternary">
                (10)
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
                <div className="regular-14 text-color-quaternary text-color-tertiary">
                  {`Được đăng bởi bạn`}
                </div>
                <div className="price semibold-20 text-color-tertiary">
                  {formatToVietnameseCurrency(currentProduct?.suggestedPrice)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
