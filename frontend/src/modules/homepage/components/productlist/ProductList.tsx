import React, {useEffect, useState} from 'react';
import {ProductDTO} from '../../model/productDto.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import './ProducList.scss';
import ProductCard from '../product-card/ProductCard.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';

const ProductList = (): React.ReactElement => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [error, setError] = useState<string | null>(null);
  const applicationService = useApplicationService();

  const fetchProducts = (): void => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.PRODUCTS_PATH}`)
      .then(response => {
        setProducts(
          response.data.data.map((product: ProductDTO) => ({
            ...product,
            imageUrl:
              'https://binhminhdigital.com/storedata/images/product/canon-eos-4000d-kit-1855mm-f3556-iii-den.jpg'
          }))
        );
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
      });
  };

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      fetchProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-5 d-flex flex-column gap-5">
      <div className="products-list row g-3">
        <div className="bold-32">Tin đăng mới</div>
        {products.map((product: ProductDTO) => (
          <div className="col-3" key={product.id.toString()}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="load-more d-flex justify-content-center">
        <AppButton style="primary" onClickFn={fetchProducts}>
          Xem Thêm
        </AppButton>
      </div>
    </div>
  );
};

export default ProductList;
