import {ReactElement, useEffect, useState} from 'react';
import './SellerProfile.scss';
import {useNavigate, useParams} from 'react-router-dom';
import {ProductWithOwnerDTO} from '../../../homepage/model/productWithOwnerDTO';
import {useApplicationService} from '../../services/application.service';
import {AppRoutingConstants} from '../../app-routing.constants';
import AppButton from '../buttons/AppButton';
import {UserDto} from '../../models/userDto';
import io from 'socket.io-client';
import UserProduct from './SellerProduct';

// Replace with your NestJS server URL
const socket = io('http://localhost:3001/chat', {
  transports: ['websocket'] // Ensure WebSocket transport is used
});

export default function SellerProfile({
  currentUser
}: {
  currentUser: UserDto | null;
}): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  const handleChatClick = async (): Promise<void> => {
    const buyerId = currentUser?.id;
    const sellerId = currentProduct?.owner.id;
    socket.emit('createRoom', {buyerId, sellerId}, (): void => {
      navigate(`/chat`);
    });
  };

  // Fetch product detail by id
  const {id} = useParams<{id: string}>();
  const [currentProduct, setCurrentProduct] =
    useState<ProductWithOwnerDTO | null>(null);

  useEffect((): void => {
    if (id) {
      applicationService
        .createApiClient()
        .get(`${AppRoutingConstants.PRODUCTS_PATH}/${id}`)
        .then(response => {
          if (response.data.data.isMyProduct) {
            console.error('You cannot exchange your own product');
            navigate(AppRoutingConstants.HOMEPAGE);
          } else {
            setCurrentProduct(response.data.data);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);


  // Function to handle tab click
  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');
  const handleTabClick = (tab: 'selling' | 'sold'): void => {
    setActiveTab(tab);
  };


  return (
    <div className="container seller-profile">
      <div className="my-5 d-flex gap-4 flex-column">
        <div className="box">
          <div className="owner d-flex justify-content-between">
            <div className="owner-info d-flex gap-3">
              <div className="avatar">
                <img
                  className="avatar"
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="avatar"
                />
              </div>
              <div className="info-and-rating">
                <div className="semibold-20 text-color-quaternary">
                  {currentProduct?.owner?.firstName}{' '}
                  {currentProduct?.owner?.lastName}
                </div>
                <div className="rating d-flex gap-2 mt-1">
                  <div className="rate-point semibold-16 text-color-quaternary">
                    5.0
                  </div>
                  <div className="stars d-flex">
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-fill text-color-secondary"></i>
                    <i className="bi bi-star-half text-color-secondary"></i>
                    <i className="bi bi-star text-color-secondary"></i>
                  </div>
                  <div className="number-of-rates regular-14 text-color-quaternary mt-1">
                    (10)
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="actions d-flex justify-content-between gap-2 mt-3">
            <AppButton className="button" variant="primary">
              Theo dõi
            </AppButton>
            <AppButton
              className="button"
              variant="secondary"
              onClick={handleChatClick}
            >
              Chat với người này
            </AppButton>
            <AppButton className="button" variant="tertiary">
              Báo cáo người này
            </AppButton>
          </div>
        </div>

        <div className="d-flex bold-25 text-color-quaternary justify-content-center">
          <div
            className={`col-6 clickable tab ${activeTab === 'selling' ? 'active' : ''}`}
            onClick={() => handleTabClick('selling')}
          >
            Đang bán
          </div>
          <div
            className={`col-6 clickable tab ${activeTab === 'sold' ? 'active' : ''}`}
            onClick={() => handleTabClick('sold')}
          >
            Đã bán
          </div>
        </div>
      </div>

      {/* Conditional Rendering */}
      <div>
        {activeTab === 'selling' ? (
         <UserProduct/>
        ) : (
          <div>
            <div className="regular-14 text-color-quaternary">
              Người này chưa bán sản phẩm nào.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
