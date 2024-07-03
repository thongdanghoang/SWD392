import './Homepage.scss';
import {ReactElement} from 'react';
import ProductList from './components/product-list/ProductList';
import Category from './components/category/Category.tsx';

export default function HomepageComponent(): ReactElement {
  return (
    <div className="homepage">
      <Category />
      <ProductList />
    </div>
  );
}
