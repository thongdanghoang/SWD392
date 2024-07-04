import {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../services/application.service.ts';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import {useNavigate} from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';

export default function SellerProduct(): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

  // Fetch my products
  const [sellerProduct, setSellerProducts] = useState<ProductWithOwnerDTO[]>([]);
  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.SELLER_PRODUCTS_PATH)
        .then(response => {
          setSellerProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

  const formatToVietnameseCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
  };

  return (
    <div className="container">
      <div className="d-flex gap-4 flex-column">
        <div className="user-product d-flex gap-3">
          {sellerProduct.length > 0 ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
              {sellerProduct.map((product: ProductWithOwnerDTO) => (
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
                      <h5 className="card-title product-title">
                        {product.title}
                      </h5>
                      <p className="card-text product-price">
                        {formatToVietnameseCurrency(product.suggestedPrice)}
                      </p>
                      <p className="card-text regular-12 product-creation-date">
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
          ) : (
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
