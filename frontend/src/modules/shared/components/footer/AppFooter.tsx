import './AppFooter.scss';
import {ReactElement} from 'react';
import logo from '@assets/images/logo.svg';


export default function AppFooter(): ReactElement {
  return (
    <>
      <div className="app-footer">
      <footer className="page-footer font-small blue pt-4">
        <div className="container-fluid ">
          <div className="row">
              <div className="col-md-6 mt-md-0 mt-3">
                <div className="Footer-Content">
                  <h5 className="text-uppercase"><img src={logo} alt="" /></h5>
                  <p>Morbi cursus porttitor enim lobortis molestie. 
                    Duis gravida turpis dui, eget bibendum magna congue nec.</p>
                    <h1>(212)555-0114 hoặc swapme@customerservice.com</h1>
              </div>
              </div>

              <hr className="clearfix w-100 d-md-none pb-0"/>

              <div className="col-md-3 mb-md-0 mb-3">
                  <ul className="list-unstyled text-end">
                    <h5 className="text-uppercase">Hỗ trợ khách hàng</h5>
                      <li><a >Trung tâm trợ giúp</a></li>
                      <li><a >An toàn mua bán</a></li>
                      <li><a >Liên hệ hỗ trợ</a></li>
                  </ul>
              </div>

              <div className="col-md-2 mb-md-0 mb-3">
                  <ul className="list-unstyled text-end text-success">
                    <h5 className="text-uppercase">Về chúng tôi</h5>
                      <li><a>Giới thiệu</a></li>
                      <li><a>Quy chế hoạt động</a></li>
                      <li><a>Chính sách bảo mật</a></li>
                      <li><a>Giải quyết tranh chấp</a></li>
                  </ul>
              </div>
          </div>
      </div>

      <div className="Thai"><hr/></div>

      
      <div className="d-flex justify-content-between pb-3">
      <div className="Footer-VersionApp">Swapme Version 12.03.02</div> 
      <div className="Footer-Location">Địa chỉ: Đại học FPT _ E2a-7, Đường D1, Phường Long Thạnh Mỹ, Q9, Thành phố Thủ Đức, TP.HCM</div>
    </div>

</footer>
      </div>
    </>
  );
}
