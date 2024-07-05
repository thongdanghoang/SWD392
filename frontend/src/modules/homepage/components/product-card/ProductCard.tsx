import './ProducCard.scss';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {ReactElement} from 'react';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import {useNavigate} from 'react-router-dom';
import {formatToVietnameseCurrency} from '../../../shared/utils.ts';

export default function ProductCard(product: ProductDto): ReactElement {
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

  return (
    <li
      key={product.id}
      className="product-card clickable"
      onClick={navigateToDetail(product.id)}
    >
      <div className="product-image">
        <img src={product?.images?.[0]} alt={product.title} />
      </div>
      <div className="product-info mt-2">
        <div className="d-flex flex-column align-items-start">
          <div className="product-title text-color-tertiary semibold-16">
            {product.title}
          </div>
          <p className="product-price text-color-quaternary semibold-20">
            {product?.isGiveAway
              ? 'Cho tặng miễn phí'
              : formatToVietnameseCurrency(product?.suggestedPrice)}
          </p>
          <p className="product-creation-date text-color-tertiary regular-12">
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
