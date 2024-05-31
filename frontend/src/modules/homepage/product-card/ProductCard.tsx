import './ProducCard.scss';
import {ReactElement} from 'react';
import {ProductDTO} from '../productDto.ts';

export default function ProductCard(product: ProductDTO): ReactElement {
  return (
    <li key={product.id} className="product-card">
      <div className="product-image">
        <img src={product.image_url} alt={product.title} />
      </div>
      <div className="product-info">
        <div className="d-flex flex-column align-items-start">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">Price: ${product.suggested_price}</p>
          <p className="product-creation-date">
            Creation date:{' '}
            {new Date(product.creation_date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </li>
  );
}
