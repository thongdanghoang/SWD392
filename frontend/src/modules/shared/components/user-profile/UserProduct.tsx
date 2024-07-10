import { ReactElement, useEffect, useState } from 'react';
import { useApplicationService } from '../../services/application.service.ts';
import { ProductWithOwnerDTO } from '../../../homepage/model/productWithOwnerDTO.ts';
import { AppRoutingConstants } from '../../app-routing.constants.ts';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import {formatToVietnameseCurrency} from '../../utils.ts';

export default function UserProduct(): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

  // Fetch my products
  const [myProducts, setMyProducts] = useState<ProductWithOwnerDTO[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.MY_PRODUCTS_PATH)
        .then(response => {
          setMyProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

  return (
    <div className="container">
      <div className="d-flex gap-4 flex-column">
        <div className="exchange-info d-flex gap-3">
          {myProducts.length > 0 && (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
              {myProducts?.map((product: ProductWithOwnerDTO) => (
                <div key={product.id} className="col">
                  <div
                    className="card product-card clickable"
                    onClick={navigateToDetail(product.id)}
                  >
                    <img
                      src={product.images[0]}
                      className="card-img-top"
                      alt={product.title}
                    />
                    <div className="card-body">
                      <h5 className="card-title product-title semibold-20 text-color-tertiary">
                        {product.title}
                      </h5>
                      <p className="card-text product-price semibold-20 text-color-quaternary">
                        {formatToVietnameseCurrency(product.suggestedPrice)}
                      </p>
                      <p className="card-text product-creation-date regular-12 text-color-tertiary">
                        Đăng cách đây{' '}
                        {formatDistanceToNow(new Date(product.creationDate), {
                          addSuffix: true,
                          locale: vi
                        })}
                      </p>
                    </div>
                  </div>
                </div>
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
        </div>
      </div>
    </div>
  );
}
