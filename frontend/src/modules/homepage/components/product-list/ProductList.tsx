import './ProducList.scss';
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import ProductCard from '../product-card/ProductCard.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {SearchResultDto} from '../../../shared/models/model.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';

const ProductList = (): React.ReactElement => {
  const [searchResult, setSearchResult] = useState<SearchResultDto<ProductDto>>(
    {
      results: [],
      total: 0
    }
  );
  const [queryParameters] = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const limit: number = 4;
  const applicationService = useApplicationService();
  const criteria: string = queryParameters.get('q') ?? '';

  const fetchProducts = (newOffset: number): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.PRODUCTS_PATH}/search`, {
        criteria,
        page: {
          offset,
          limit
        }
      })
      .then(response => {
        setSearchResult(prevState => ({
          results: [...prevState.results, ...response.data.results],
          total: response.data.total
        }));
        setOffset(newOffset + limit);
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
      });
  };

  useEffect(() => {
    setOffset(0);
    setSearchResult({results: [], total: 0});
    fetchProducts(offset);
  }, [criteria]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-5 d-flex flex-column gap-5">
      <div className="products-list row g-3">
        {searchResult?.total !== 0 && (
          <div className="bold-32 text-color-quaternary">Tin đăng mới</div>
        )}
        {searchResult?.total === 0 && (
          <div className="bold-32 text-color-quaternary">
            Không tìm thấy sản phẩm nào
          </div>
        )}
        {searchResult?.results?.map((product: ProductDto) => (
          <div
            className="col-12 col-xxl-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-xs-12 d-flex justify-content-center"
            key={product.id.toString()}
          >
            <ProductCard {...product} />
          </div>
        ))}
      </div>
      {searchResult.results.length < searchResult.total &&
        searchResult.total !== 0 && (
          <div className="load-more d-flex justify-content-center">
            <AppButton
              variant="primary"
              onClick={() => {
                setOffset(prevOffset => prevOffset + limit);
                fetchProducts(offset);
              }}
            >
              Xem Thêm
            </AppButton>
          </div>
        )}
    </div>
  );
};

export default ProductList;
