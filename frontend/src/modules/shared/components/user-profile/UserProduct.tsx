import {ReactElement, useEffect, useState} from 'react';
import {useApplicationService} from '../../services/application.service.ts';
import {ProductDTO} from '../../../homepage/model/productDto.ts';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import {useNavigate} from 'react-router-dom';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import './UserProduct.scss';

export default function UserProduct(): ReactElement {
  const applicationService = useApplicationService();

  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

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
        <div className="exchange-info d-flex gap-3">
          {myProducts.length > 0 && (
            <div className="my-products d-flex justify-content-start gap-3">
              {myProducts?.map((product: ProductDTO) => (
                <li
                  key={product.id}
                  className="product-card clickable"
                  onClick={navigateToDetail(product.id)}
                >
                  <div className="product-image">
                    <img src={product.imageUrl} alt={product.title} />
                  </div>
                  <div className="product-info">
                    <div className="d-flex flex-column align-items-start">
                      <h2 className="product-title">{product.title}</h2>
                      <p className="product-price">
                        {formatToVietnameseCurrency(product.suggestedPrice)}
                      </p>
                      <p className="product-creation-date">
                        Đăng cách đây{' '}
                        {formatDistanceToNow(new Date(product.creationDate), {
                          addSuffix: true,
                          locale: vi
                        })}{' '}
                      </p>
                    </div>
                  </div>
                </li>
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
