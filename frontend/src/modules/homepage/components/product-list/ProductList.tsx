import './ProducList.scss';
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import ProductCard from '../product-card/ProductCard.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {SearchResultDto} from '../../../shared/models/model.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import {ApplicationConstants} from '../../../shared/applicationConstants.ts';

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
  const limit: number = ApplicationConstants.DEFAULT_LIMIT;
  const applicationService = useApplicationService();
  const keyword: string = queryParameters.get('q') ?? '';
  const [categoryId, setCategoryId] = useState<number | null>(
    parseInt(queryParameters.get('category') ?? '', 10) || null
  );

  useEffect(() => {
    const newCategoryId = parseInt(queryParameters.get('category') ?? '', 10);
    if (!isNaN(newCategoryId)) {
      setCategoryId(newCategoryId);
    }
  }, [queryParameters]);

  const fetchProducts = (): void => {
    applicationService
      .createApiClient()
      .post(`${AppRoutingConstants.PRODUCTS_PATH}/search`, {
        criteria: {
          keyword,
          categoryId
        },
        page: {
          offset,
          limit
        }
      })
      .then(response => {
        setOffset(offset + limit);
        setSearchResult(prevState => ({
          results: [...prevState.results, ...response.data.results],
          total: response.data.total
        }));
      })
      .catch(error => {
        console.error('API error:', error);
        setError('Failed to fetch products');
      });
  };

  useEffect((): void => {
    fetchProducts();
  }, [keyword, categoryId]);

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
              onClick={(): void => {
                fetchProducts();
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
