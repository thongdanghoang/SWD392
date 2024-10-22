import './CategoryItem.scss';
import {ReactElement} from 'react';
import {CategoryDto} from '../../model/productWithOwnerDTO.ts';
import {useNavigate} from 'react-router-dom';

export default function CategoryItem(categoryDto: CategoryDto): ReactElement {
  const navigate = useNavigate();
  const handleCategoryClick = (): void => {
    navigate(`/products?category=${categoryDto.id}`);
  };
  return (
    <li
      key={categoryDto.id}
      className="category-item clickable"
      onClick={handleCategoryClick}
    >
      <div className="category-image">
        <img src={categoryDto?.image} alt={categoryDto.title} />
      </div>
      <div className="category-info">
        <div className="d-flex flex-column align-items-start">
          <h2 className="category-title">{categoryDto.title}</h2>
        </div>
      </div>
    </li>
  );
}
