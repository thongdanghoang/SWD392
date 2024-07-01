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
            <img
              className="avatar"
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="avatar"
            />
          </div>
          <div className="info">
            <div
              className="full-name semibold-20 clickable"
              onClick={() => navigate('/user-profile')}
            >
              {currentUser?.firstName} {currentUser?.lastName}
            </div>
            <div className="rating d-flex gap-3">
              <div className="rate-point semibold-16">5.0</div>
              <div className="stars d-flex gap-1">
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-fill"></i>
                <i className="bi bi-star-half"></i>
                <i className="bi bi-star"></i>
              </div>
              <div className="number-of-rates regular-14">(10)</div>
            </div>
          </div>
        </div>
        <div className="follow d-flex justify-content-between">
          <div className="following regular-14">12 đang theo dõi</div>
          <div className="followers regular-14">12 người theo dõi</div>
        </div>
      </div>
      <div className="offcanvas-body list-features p-0">
        <div className="list-title">
          <div className="semibold-16 text-color-quaternary">
            Quản lý đơn hàng
          </div>
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Đơn mua
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Đơn bán
        </div>
        <div className="list-title semibold-16 text-color-quaternary">
          Tiện ích
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Tin đã lưu
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Tìm kiếm đã lưu
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Đánh giá từ tôi
        </div>
        <div className="list-item regular-14 text-color-quaternary">
          Lịch sử giao dịch
        </div>
        <div className="list-title semibold-16 text-color-quaternary">Khác</div>
        <div
          className="list-item regular-14  text-color-quaternary"
          onClick={(): void => {
            if (applicationService.isRoleAdmin()) {
              window.location.href =
                'https://thongdanghoang.id.vn/auth/admin/SwapMe/console/';
            } else {
              window.location.href =
                'https://thongdanghoang.id.vn/auth/realms/SwapMe/account/';
            }
          }}
        >
          Cài đặt tài khoản
        </div>
        <div className="list-item regular-14  text-color-quaternary">
          Trợ giúp
        </div>
        <div className="list-item regular-14  text-color-quaternary">
          Đóng góp ý kiến
        </div>
        <div
          className="list-item regular-14  text-color-quaternary"
          onClick={() => applicationService.signOutRedirect()}
        >
          Đăng xuất
        </div>
      </div>
    </div>
  );
}
