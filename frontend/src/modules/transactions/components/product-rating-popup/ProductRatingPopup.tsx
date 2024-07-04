// src/ProductRatingPopup.tsx
import React, {useState} from 'react';
import './ProductRatingPopup.scss';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO';
import AppButton from '../../../shared/components/buttons/AppButton';
import {UserDto} from '../../../shared/models/userDto';

interface ProductRatingPopupProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (rating: number, comment: string) => void;
  currentUser: UserDto | null;
  currentProduct: ProductWithOwnerDTO | null;
}

const ProductRatingPopup: React.FC<ProductRatingPopupProps> = ({
  show,
  onClose,
  onSubmit,
  currentUser,
  currentProduct
}) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!currentProduct) {
    return null; // Nếu không có sản phẩm hiện tại, không hiển thị popup
  }

  const handleSubmit = (): void => {
    onSubmit(rating, comment);
    onClose();
  };

  if (!show) {
    return null;
  }

  const formatToVietnameseCurrency = (amount: number | undefined): string => {
    if (amount) {
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      });
      return formatter.format(amount);
    }
    return '';
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={e => e.stopPropagation()}>
        <div className="semibold-20 text-color-tertiary">
          Đánh giá giao dịch
        </div>
        <div className="product-info">
          <img
            src={currentProduct.images[0]} // Lấy hình ảnh đầu tiên của sản phẩm
            alt={currentProduct.title}
            className="product-image"
          />
          <div className="product-details">
            <div className="d-flex gap-5">
              <div className="d-flex flex-column gap-2">
                <div className="semibold-20 text-color-quaternary">
                  {currentProduct.title}
                </div>
                <div className="regular-14 text-color-tertiary">
                  Được đăng bởi {currentProduct.owner.firstName}{' '}
                  {currentProduct.owner.lastName}
                </div>
              </div>
              <div className="semibold-20 text-color-tertiary mt-3">
                {formatToVietnameseCurrency(currentProduct?.suggestedPrice)}
              </div>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Số điện thoại:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    {`0978 45* *** (Nhấn để hiện số)`}
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <div className="semibold-14 text-color-quaternary">
                    Địa chỉ:
                  </div>
                  <div className="regular-14 text-color-tertiary">
                    Phường 13, Quận Bình Thạnh, Tp Hồ Chí Minh
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex m-3">
          <div className="semibold-20 text-color-quaternary col-1 mt-2">
            {currentUser?.firstName} {currentUser?.lastName}
          </div>
          <div className="col-11 box">
            <div className="ms-3 pb-4">
              <span className="semibold-20 text-color-quaternary me-1">
                {rating.toFixed(1)}
              </span>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={star <= rating ? 'star filled' : 'star'}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
              <textarea
                placeholder="Sản phẩm rất tốt, đúng mô tả. Thái độ người bán nhiệt tình."
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
            </div>
          </div>
        </div>

        <AppButton
          variant="secondary"
          className="submit-button"
          onClick={handleSubmit}
        >
          Xác nhận
        </AppButton>
      </div>
    </div>
  );
};

export default ProductRatingPopup;
