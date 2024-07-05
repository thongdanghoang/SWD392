import './UserDashboard.scss';
import {ReactElement, useContext, useEffect, useState} from 'react';
import {UserDto} from '../shared/models/userDto.ts';
import {UserContext} from '../shared/services/userContext.ts';
import {useNavigate} from 'react-router-dom';
import {useApplicationService} from '../shared/services/application.service.ts';
import {ProductWithOwnerDTO} from '../homepage/model/productWithOwnerDTO.ts';
import {AppRoutingConstants} from '../shared/app-routing.constants.ts';
import {Table} from 'react-bootstrap';
import {formatToVietnameseCurrency} from '../shared/utils.ts';
import {
  ExchangeRequestDto,
  ExchangeStatusDto,
  getExchangeStatusText
} from '../transactions/models/model.ts';

export default function UserDashboard(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const navigate = useNavigate();
  const applicationService = useApplicationService();
  // Fetch my products
  const [myProducts, setMyProducts] = useState<ProductWithOwnerDTO[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.MY_PRODUCTS_PATH)
        .then(response => {
          setMyProducts(response.data.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);
  const [histories, setHistories] = useState<ExchangeRequestDto[]>([]);
  useEffect((): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .get(AppRoutingConstants.EXCHANGE_PATH)
        .then(response => {
          setHistories(response.data ?? []);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);
  return (
    <div className="user-dashboard container mt-5">
      <div className="d-flex flex-column gap-4">
        <div className="row flex-column flex-lg-row px-0 flex-nowrap gap-1 gap-lg-4">
          <div className="user-avatar col py-lg-4">
            <div className="d-flex flex-column align-items-center justify-content-center gap-lg-2">
              <div className="avatar clickable">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="110"
                  height="110"
                  fill="#1F7343"
                  className="bi bi-person-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fill-rule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
              </div>
              <div className="text-color-quaternary semibold-20">{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
            </div>
          </div>
          <div className="user-profile d-flex flex-column col p-1 p-lg-3 gap-1 gap-lg-3">
            <div className="semibold-16 text-color-tertiary">
              Thông tin cá nhân
            </div>
            <div className="d-flex flex-column gap-1 gap-lg-2">
              <div className="semibold-20 text-color-quaternary">{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
              <div className="regular-14 text-color-tertiary">{`Email: ${currentUser?.email}`}</div>
              <div className="regular-14 text-color-tertiary">{`Địa chỉ: `}</div>
              <div className="regular-14 text-color-tertiary">{`Sđt: `}</div>
            </div>
            <div className="semibold-16 text-color-tertiary text-decoration-underline clickable">
              Chỉnh sửa
            </div>
          </div>
          <div className="user-posts col p-1 p-lg-3">
            <div className="d-flex justify-content-between">
              <div className="semibold-16 text-color-tertiary">
                Bài đăng của bạn
              </div>
              <div className="regular-14 text-color-tertiary text-decoration-underline clickable">
                Xem tất cả
              </div>
            </div>
            <div className="my-posts d-flex flex-column gap-1 gap-lg-3 mt-1 mt-lg-3">
              {myProducts.map((product: ProductWithOwnerDTO, index: number) => (
                <div
                  key={index}
                  className="my-post d-flex gap-1 gap-lg-3 align-items-center clickable"
                  onClick={() =>
                    navigate(`${AppRoutingConstants.PRODUCTS}/${product.id}`)
                  }
                >
                  <div className="post-image">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      height={50}
                      width={50}
                      style={{objectFit: 'cover', borderRadius: '8px'}}
                    />
                  </div>
                  <div className="semibold-14 text-color-quaternary">
                    {product.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="exchange-histories col">
            <div className="p-2 p-lg-4 d-flex justify-content-between align-items-center">
              <div className="semibold-20 text-color-tertiary">
                Lịch sử giao dịch
              </div>
              <div className="regular-14 text-color-tertiary text-decoration-underline clickable">
                Xem tất cả
              </div>
            </div>
            <div className="histories">
              <Table responsive borderless hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Ngày bắt đầu</th>
                    <th>Ngày kết thúc</th>
                    <th>Số tiền</th>
                    <th>Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  {histories.map((history, index) => (
                    <tr
                      key={history.id}
                      onClick={() => navigate(`/exchange-detail/${history.id}`)}
                    >
                      <td>#{index + 1}</td>
                      <td>
                        {history?.creationDate
                          ? new Date(history.creationDate).toLocaleDateString()
                          : ''}
                      </td>
                      <td>
                        {history.status === ExchangeStatusDto.ACCEPTED
                          ? history?.lastModificationDate
                            ? new Date(
                                history.lastModificationDate
                              ).toLocaleDateString()
                            : ''
                          : getExchangeStatusText(history.status)}
                      </td>
                      <td>
                        {history.status === ExchangeStatusDto.ACCEPTED
                          ? formatToVietnameseCurrency(0)
                          : formatToVietnameseCurrency(0)}
                      </td>
                      <td>{getExchangeStatusText(history.status)}</td>
                    </tr>
                  ))}
                  {histories.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center">
                        Chưa có bất kì trao đổi nào được thực hiện
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
