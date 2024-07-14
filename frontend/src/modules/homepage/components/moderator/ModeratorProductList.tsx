import './ModeratorProductList.scss';
import React, {useEffect, useState} from 'react';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import ProductRecord from './ProductRecord.tsx';

const ModeratorProductList = (): React.ReactElement => {
  const [searchResult, setSearchResult] = useState<ProductDto[]>([]);
  const applicationService = useApplicationService();
  const fetchProducts = (): void => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.PRODUCTS_PATH}/moderator`)
      .then(response => {
        setSearchResult(response.data.data);
      })
      .catch(error => {
        console.error('API error:', error);
      });
  };

  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      fetchProducts();
    }
  }, [applicationService.isAuthenticated()]);

  return (
    <div className="container my-5 d-flex flex-column gap-5">
      <div className="products-list row g-3">
        {searchResult && (
          <div className="bold-32 text-color-quaternary">Tất cả tin đăng</div>
        )}
        {!searchResult && (
          <div className="bold-32 text-color-quaternary">
            Không tìm thấy sản phẩm nào
          </div>
        )}
        {searchResult?.map((product: ProductDto) => (
          <div className="d-flex flex-column" key={product.id.toString()}>
            <ProductRecord {...product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModeratorProductList;
