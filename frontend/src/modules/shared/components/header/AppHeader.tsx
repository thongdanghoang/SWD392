import logo from '@assets/images/logo.svg';
import './AppHeader.scss';
import {ReactElement} from 'react';
import AppButton from '../buttons/AppButton.tsx';

export default function AppHeader(): ReactElement {
  return (
    <div className="app-header position-sticky">
      <div className="container py-3 d-flex justify-content-between">
        <img src={logo} alt="logo" />
        <div className="d-flex align-items-center">
          <div className="search d-flex align-items-center gap-2 px-3">
            <i className="search-icon bi bi-search"></i>
            <input className="search-bar" type="text" placeholder="Search" />
          </div>
        </div>
        <div className="search-and-actions d-flex align-items-center">
          <div className="actions d-flex flex-row">
            <div className="user-actions-detail d-flex align-items-center gap-4 px-5">
              <i className="fs-5 bi bi-bell btn"></i>
              <i className="fs-5 bi bi-chat-left-text btn"></i>
              <i className="fs-5 bi bi-bag btn"></i>
              <div className="user-info d-flex flex-row align-items-center">
                <i className="fs-5 bi bi-person-circle btn-lg btn"></i>
                <div className="user-full-name regular-14">DangHoangThong</div>
              </div>
            </div>
            <AppButton style="primary" children={`Đăng tin ngay`} />
          </div>
        </div>
      </div>
    </div>
  );
}
