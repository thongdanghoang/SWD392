import './ProducCard.scss';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {ReactElement} from 'react';
import {ProductDto} from '../../model/productWithOwnerDTO.ts';
import {useNavigate} from 'react-router-dom';

export default function ProductCard(product: ProductDto): ReactElement {
  const navigate = useNavigate();

  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };

  const formatToVietnameseCurrency = (amount: number): string => {
    const formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    return formatter.format(amount);
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
      <div className="product-info">
        <div className="d-flex flex-column align-items-start">
          <h2 className="product-title">{product.title}</h2>
          <p className="product-price">
            {formatToVietnameseCurrency(product.suggestedPrice)}
          </p>
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
