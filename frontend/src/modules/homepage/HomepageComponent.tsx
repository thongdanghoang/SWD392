import './Homepage.scss';
import {ReactElement} from 'react';
import ProductList from '../shared/components/productlist/ProductList';

export default function HomepageComponent(): ReactElement {
  return (
    <div className="homepage">
      <h1>Homepage worked!</h1>
      <ProductList />
    </div>
  );
}
