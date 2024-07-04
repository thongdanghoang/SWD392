import React, {useState} from 'react';
import ProductRatingPopup from './ProductRatingPopup';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO';
import {UserDto} from '../../../shared/models/userDto';
import AppButton from '../../../shared/components/buttons/AppButton';

interface RatingManagerProps {
  currentUser: UserDto | null;
  currentProduct: ProductWithOwnerDTO | null;
}

const RatingManager: React.FC<RatingManagerProps> = ({
  currentUser,
  currentProduct
}) => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = (): void => {
    setPopupOpen(true);
  };

  const handleClosePopup = (): void => {
    setPopupOpen(false);
  };

  const handleSubmitRating = (): void => {
    // Xử lý việc submit đánh giá và bình luận tại đây
    // Có thể bạn muốn gửi dữ liệu này đến server hoặc thực hiện các hành động khác
  };

  return (
    <div>
      <AppButton
        variant="secondary"
        children={`Đánh giá sản phẩm`}
        onClick={handleOpenPopup}
      />
      {isPopupOpen && currentProduct && (
        <ProductRatingPopup
          show={isPopupOpen} // Thêm prop show
          currentUser={currentUser}
          currentProduct={currentProduct}
          onClose={handleClosePopup}
          onSubmit={handleSubmitRating} // Thêm prop onSubmit
        />
      )}
    </div>
  );
};

export default RatingManager;
