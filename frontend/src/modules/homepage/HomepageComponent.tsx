import './Homepage.scss';
import {ReactElement} from 'react';
import ProductList from './productlist/ProductList';

export default function HomepageComponent(): ReactElement {
  return (
    <div className="homepage">
      <ProductList />
    </div>
  );
}
