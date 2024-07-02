import React, {useEffect, useState} from 'react';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import './ProducList.scss';
import ProductCard from '../product-card/ProductCard.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';

const ProductList = (): React.ReactElement => {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const applicationService = useApplicationService();

  const fetchProducts = (): void => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.PRODUCTS_PATH}`)
      .then(response => {
        setProducts(
          response.data.data?.map((product: ProductDto) => ({
            ...product
          }))
        );
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-5 d-flex flex-column gap-5">
      <div className="products-list row g-3">
        <div className="bold-32">Tin đăng mới</div>
        {products.map((product: ProductDto) => (
          <div
            className="col-12 col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center"
            key={product.id.toString()}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      <div className="load-more d-flex justify-content-center">
        <AppButton variant="primary" onClick={fetchProducts}>
          Xem Thêm
        </AppButton>
      </div>
    </div>
  );
};

export default ProductList;
