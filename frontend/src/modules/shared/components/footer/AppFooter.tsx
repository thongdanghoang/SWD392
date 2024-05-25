import logo from '@assets/images/logo.svg';
import './AppFooter.scss';
import {ReactElement} from 'react';

export default function AppFooter(): ReactElement {
  return (
    <>
      <div className="app-footer">
        <div className="container">
          <div className="page-footer">
            <div className="d-flex justify-content-between my-5">
              <div className="app-info d-flex flex-column gap-2">
                <h5 className="text-uppercase">
                  <img src={logo} alt="" />
                </h5>
                <p className="app-description regular-14">
                  Swap Me là nơi trao đổi với mục đích tạo ra cho bạn một kênh
                  trung gian giúp kết nối giữa người mua với người bán một cách
                  dễ dành, nhanh chóng và tiện lợi.
                </p>
                <div className="CTA d-flex justify-content-between gap-3">
                  <a className="semibold-14" href="tel:2125550114">
                    Hotline: (212)555-0114
                  </a>
                  <p className="regular-14">hoặc</p>
                  <a
                    className="semibold-14"
                    href="mailto:swapme@customerservice.com"
                  >
                    swapme@customerservice.com
                  </a>
                </div>
              </div>

              <div className="app-support d-flex gap-5">
                <ul className="support list-unstyled text-end d-flex flex-column gap-3 me-5">
                  <h5 className="semibold-16">Hỗ trợ khách hàng</h5>
                  <li>
                    <a className="regular-14">Trung tâm trợ giúp</a>
                  </li>
                  <li>
                    <a className="regular-14">An toàn mua bán</a>
                  </li>
                  <li>
                    <a className="regular-14">Liên hệ hỗ trợ</a>
                  </li>
                </ul>

                <ul className="help list-unstyled text-end d-flex flex-column gap-3">
                  <h5 className="semibold-16">Về chúng tôi</h5>
                  <li>
                    <a className="regular-14">Giới thiệu</a>
                  </li>
                  <li>
                    <a className="regular-14">Quy chế hoạt động</a>
                  </li>
                  <li>
                    <a className="regular-14">Chính sách bảo mật</a>
                  </li>
                  <li>
                    <a className="regular-14">Giải quyết tranh chấp</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="copyright d-flex justify-content-between">
            <div className="footer-version-app regular-14">
              Swapme Version 12.03.02
            </div>
            <div className="footer-location regular-14">
              Địa chỉ: Đại học FPT - E2a-7, Đường D1, Phường Long Thạnh Mỹ, Q9,
              Thành phố Thủ Đức, TP.HCM.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
