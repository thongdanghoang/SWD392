import './ProducCard.scss';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {ReactElement} from 'react';
import {ProductDTO} from '../../model/productDto.ts';

export default function ProductCard(product: ProductDTO): ReactElement {
  return (
    <li key={product.id} className="product-card">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.title} />
      </div>
      <div className="product-info">
        <div className="d-flex flex-column align-items-start">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">Price: ${product.suggestedPrice}</p>
          <p className="product-creation-date">
            Đăng cách đây{' '}
            {formatDistanceToNow(new Date(product.creationDate), {
              addSuffix: true,
              locale: vi
            })}{' '}
          </p>
        </div>
      </div>
    </li>
  );
}
