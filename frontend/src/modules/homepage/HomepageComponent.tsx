import './Homepage.scss';
import {ReactElement} from 'react';
import ProductList from './components/product-list/ProductList';
import ModeratorProductList from './components/moderator/ModeratorProductList.tsx';
import {useApplicationService} from '../shared/services/application.service.ts';
import Category from './components/category/Category.tsx';

export default function HomepageComponent(): ReactElement {
  const applicationService = useApplicationService();
  return (
    <div className="homepage">
      {(applicationService.isRoleUser() ||
        !applicationService.isAuthenticated()) && <ProductList />}
      {applicationService.isModeratorUser() && <ModeratorProductList />}
      <Category />
      <ProductList />
    </div>
  );
}
