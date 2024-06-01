import React, {useEffect, useState} from 'react';
import ApplicationService from '../../../shared/services/application.service.ts';
import {ProductDTO} from '../../models/productDto.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import {ApplicationConstants} from '../../../shared/application.constants.ts';
import './ProducList.scss';

const ProductList = (): React.ReactElement => {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const applicationService: ApplicationService =
    ApplicationService.getInstance();

  const fetchProducts = (): void => {
    setLoading(true);
    applicationService
      .createApiClient()
      .get(`${ApplicationConstants.API_URL}/products`)
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
        setLoading(false);
      });
  };

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      fetchProducts();
    }
  }, [applicationService.isAuthenticated()]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (applicationService.isAuthenticated()) {
    return (
      <div className="product-list">
        <h1>Tin đăng mới</h1>
        <ul className="products">
          {products.map(product => (
            <li key={product.id} className="product-card">
              <div className="product-content">
                <h2 className="product-title">{product.title}</h2>
                <p className="product-price">
                  Price: ${product.suggested_price}
                </p>
                <p className="product-creation-date">
                  Creation date:{' '}
                  {new Date(product.creation_date).toLocaleDateString()}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="button-container">
          <AppButton
            style="secondary"
            className="load-more"
            onClickFn={fetchProducts}
          >
            Xem Thêm
          </AppButton>
        </div>
      </div>
    );
  }

  return <div>Not logged in! Try to refresh to be redirected to Google.</div>;
};

export default ProductList;
