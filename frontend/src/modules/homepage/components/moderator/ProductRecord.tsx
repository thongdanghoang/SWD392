import {ReactElement} from 'react';
import {
  ProductDto,
  ProductStatus,
  getProductStatusDisplay
} from '../../model/productWithOwnerDTO.ts';
import {useNavigate} from 'react-router-dom';
import {formatToVietnameseCurrency} from '../../../shared/utils.ts';
import AppButton from '../../../shared/components/buttons/AppButton.tsx';
import {AppRoutingConstants} from '../../../shared/app-routing.constants.ts';
import {useApplicationService} from '../../../shared/services/application.service.ts';
import {DeleteProductConfirmationModal} from '../../../shared/components/product-detail/DeleteProductConfirmationModal.tsx';
import {useModal} from '../../../shared/components/modal/useModal.tsx';
import {RejectProductConfirmationModal} from './RejectProductConfirmationModal.tsx';

export default function ProductRecord(product: ProductDto): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();
  const navigateToDetail = (id: string) => {
    return (): void => {
      navigate(`/products/${id}`);
    };
  };
  const modalContext = useModal();
  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  const handleAcceptProduct = (): void => {
    applicationService
      .createApiClient()
      .patch(
        `${AppRoutingConstants.PRODUCTS_PATH}/moderator/accept/${product.id}`
      )
      .then((): void => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleRejectProduct = (): void => {
    applicationService
      .createApiClient()
      .patch(
        `${AppRoutingConstants.PRODUCTS_PATH}/moderator/reject/${product.id}`
      )
      .then((): void => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };
  const handleRemoveProduct = (): void => {
    applicationService
      .createApiClient()
      .patch(
        `${AppRoutingConstants.PRODUCTS_PATH}/moderator/remove/${product.id}`
      )
      .then((): void => {
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col d-flex gap-lg-4">
          <img
            src={product?.images?.[0]}
            alt={product.title}
            width={100}
            height={100}
            style={{objectFit: 'cover'}}
          />
          <div className="col text-color-tertiary semibold-16 d-flex align-items-center">
            {product.title}
          </div>
        </div>
        <div className="col text-color-quaternary semibold-20 d-flex align-items-center">
          {product?.isGiveAway
            ? 'Cho tặng miễn phí'
            : formatToVietnameseCurrency(product?.suggestedPrice)}
        </div>
        <div className="col text-color-tertiary semibold-16 d-flex align-items-center">
          {getProductStatusDisplay(product.status)}
        </div>
        <div
          className="col d-flex align-items-center clickable"
          onClick={navigateToDetail(product.id)}
        >
          <AppButton variant="secondary">Chi tiết</AppButton>
        </div>
        {product.status === ProductStatus.PUBLISHED && (
          <div
            className="col d-flex align-items-center"
            onClick={() =>
              showModal(DeleteProductConfirmationModal, handleRemoveProduct)
            }
          >
            <AppButton variant="tertiary">Xoá</AppButton>
          </div>
        )}
        {product.status === ProductStatus.REVIEWING && (
          <>
            <div
              className="col d-flex align-items-center"
              onClick={handleAcceptProduct}
            >
              <AppButton variant="primary">Chấp thuận</AppButton>
            </div>
            <div
              className="col d-flex align-items-center"
              onClick={() =>
                showModal(RejectProductConfirmationModal, handleRejectProduct)
              }
            >
              <AppButton variant="tertiary">Từ chối</AppButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
