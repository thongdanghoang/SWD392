import './ProfileOffCanvas.scss';
import {ReactElement} from 'react';
import {UserDto} from '../../models/userDto.ts';
import {useApplicationService} from '../../services/application.service.ts';
import {useNavigate} from 'react-router-dom';

interface PopupProfileProps {
  currentUser: UserDto | null;
}

export default function ProfileOffCanvas({
  currentUser
}: PopupProfileProps): ReactElement {
  const applicationService = useApplicationService();
  const navigate = useNavigate();

  return (
    <div
      className="popup-profile offcanvas offcanvas-end"
      tabIndex={-1}
      id="popup-profile"
      aria-labelledby="offcanvasExampleLabel"
    >
      <div className="offcanvas-header p-4 m-0 gap-3 flex-column align-items-baseline">
        <div className="reviewer d-flex gap-4">
          <div
            className="avatar clickable"
            onClick={() => navigate('/user-profile')}
          >
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
          <div className="info d-flex align-items-center">
            <div
              className="full-name semibold-20 clickable"
              onClick={() => navigate('/user-profile')}
            >
              {currentUser?.firstName} {currentUser?.lastName}
            </div>
          </div>
        </div>
      </div>
      <div className="offcanvas-body list-features p-0">
        <div className="list-title semibold-16 text-color-quaternary">
          Tiện ích
        </div>
        <div
          className="list-item regular-14 text-color-quaternary"
          onClick={() => navigate('/user/dashboard')}
        >
          Bảng điều khiển người dùng
        </div>
        <div
          className="list-item regular-14  text-color-quaternary"
          onClick={(): void => {
            if (applicationService.isRoleAdmin()) {
              window.location.href =
                'http://localhost:8443/admin/swap-me/console/';
            } else {
              window.location.href =
                'http://localhost:8443/realms/swap-me/account/';
            }
          }}
        >
          Trung tâm bảo mật
        </div>
        <div
          className="list-item regular-14 text-color-quaternary"
          onClick={() => applicationService.signOutRedirect()}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
}
