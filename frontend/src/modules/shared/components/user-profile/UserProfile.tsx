import {ReactElement} from 'react';
import './UserProfile.scss';
import UserProduct from './UserProduct.tsx';

export default function UserProfile(): ReactElement {

  return (
    <div className="container">
      
      <div className="my-5 d-flex gap-4 flex-column">
        <div className='box'>
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
                        <div className="semibold-20 text-color-quaternary"> Thống Đặng Hoàng
                          {/* {currentProduct?.owner
                            ? `${currentProduct?.owner.firstName} ${currentProduct?.owner.lastName}`
                            : 'Người bán'} */}
                        </div>
                        <div className="rating d-flex gap-3">
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
                          <div className="number-of-rates regular-14 text-color-quaternary">
                            (10)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        </div>
        <div className="d-flex bold-25 text-color-quaternary justify-content-center">
          <div className="col-6">Đang bán</div> <div className="">Đã bán</div>
        </div>
      </div>
      <div>
        <UserProduct />
      </div>
    </div>
  );
}
