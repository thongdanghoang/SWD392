import React, {useEffect, useState} from 'react';
import {CategoryDto} from '../../model/productWithOwnerDTO.ts';
import '../product-list/ProducList.scss';
import CategoryItem from './CategoryItem.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';

const Category = (): React.ReactElement => {
  const [categories, setCategories] = useState<CategoryDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const applicationService = useApplicationService();

  const fetchCategories = (): void => {
    applicationService
      .createApiClient()
      .get(`${AppRoutingConstants.CATEGORIES_PATH}`)
      .then(response => {
        setCategories(
          response.data?.map((product: CategoryDto) => ({
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
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container my-5 d-flex flex-column gap-5">
      <div className="products-list row g-3">
        <div className="bold-32">Danh mục</div>
        {categories.map((category: CategoryDto) => (
          <div
            className="col-2 d-flex justify-content-center"
            key={category.id}
          >
            <CategoryItem {...category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
