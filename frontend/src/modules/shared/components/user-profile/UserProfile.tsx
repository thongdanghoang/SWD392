import {ReactElement, useContext, useState} from 'react';
import './UserProfile.scss';
import {UserDto} from '../../models/userDto';
import {useNavigate} from 'react-router-dom';
import UserProduct from './UserProduct';
import AppButton from '../buttons/AppButton.tsx';
import {UserContext} from '../../services/userContext.ts';

export default function UserProfile(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const [activeTab, setActiveTab] = useState<'selling' | 'sold'>('selling');
  const navigate = useNavigate();

  // Function to handle tab click
  const handleTabClick = (tab: 'selling' | 'sold'): void => {
    setActiveTab(tab);
  };

  return (
    <div className="container user-profile">
      <div className="my-5 d-flex gap-4 flex-column">
        <div className="box">
          <div className="owner d-flex justify-content-between">
            <div className="owner-info d-flex gap-3">
              <div className="avatar">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="avatar"
                    width={60}
                    height={60}
                    className="user-avatar"
                    style={{borderRadius: '50%'}}
                  />
                ) : (
                  <img
                    className="avatar"
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="avatar"
                  />
                )}
              </div>
              <div className="info-and-rating">
                <div className="semibold-20 text-color-quaternary">
                  {currentUser?.firstName} {currentUser?.lastName}
                </div>
                <div className="rating d-flex gap-2 mt-1">
                  <div className="rate-point semibold-16 text-color-quaternary">
                    5.0
                  </div>
                  <div className="stars d-flex gap-1">
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
            <AppButton
              variant="secondary"
              onClick={() => navigate(`/edit-profile`)}
              children={'Chỉnh sửa '}
            />
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
          <UserProduct />
        ) : (
          <div>
            <div className="regular-14 text-color-quaternary">
              Bạn chưa bán được sản phẩm nào.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
