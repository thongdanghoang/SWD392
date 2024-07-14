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
import UploadAvatarWidget from './UploadAvatarWidget.tsx';
import {useModal} from '../shared/components/modal/useModal.tsx';
import FirstnameLastnameEditFormModal from './FirstnameLastnameEditFormModal.tsx';
import AddressFormModal from '../products/components/AddressFormModal.tsx';
import {getWardByCode} from 'vn-local-plus';
import PhoneNumberEditFormModal from './PhoneNumberEditFormModal.tsx';

export default function UserDashboard(): ReactElement {
  const currentUser: UserDto | null | undefined = useContext(UserContext)?.user;
  const updateUserData = useContext(UserContext)?.updateUserData;
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
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  useEffect((): void => {
    if (currentUser) {
      setAvatarUrl(currentUser.avatar);
    }
  }, [currentUser]);
  const handleUploadComplete = (imageUrl: string): void => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .createApiClient()
        .patch(AppRoutingConstants.UPDATE_AVATAR_PATH, {avatarUrl: imageUrl})
        .then(response => {
          setAvatarUrl(response.data.avatar);
          updateUserData?.(response.data);
        })
        .catch(error => console.error(error));
    }
  };
  const getFullAddressName = (user: UserDto): string => {
    return user.addressDetail
      ? `${user.addressDetail} ${getWardByCode(user.wardCode).fullName}`
      : '';
  };
  const [fullAddressName, setFullAddressName] = useState<string>('');
  useEffect((): void => {
    if (currentUser) {
      setFullAddressName(getFullAddressName(currentUser));
    }
  }, [currentUser]);
  const modalContext = useModal();
  if (!modalContext) {
    return <div>Loading...</div>;
  }
  const {showModal} = modalContext;
  const handleUpdateUserFullNameModalSubmit = (data: any): void => {
    if (applicationService.isAuthenticated()) {
      void applicationService
        .createApiClient()
        .patch(AppRoutingConstants.UPDATE_FULL_NAME_PATH, {
          firstName: data.firstName,
          lastName: data.lastName
        })
        .then(response => updateUserData?.(response.data))
        .catch(error => console.error(error));
    }
  };
  const handleAddressFormModalSubmit = (data: any): void => {
    const userNewAddressData = {
      provinceCode: data.provinceCode,
      districtCode: data.districtCode,
      wardCode: data.wardCode,
      addressDetail: data.addressDetail
    };
    if (applicationService.isAuthenticated()) {
      void applicationService
        .createApiClient()
        .patch(AppRoutingConstants.UPDATE_ADDRESS_PATH, userNewAddressData)
        .then(response => setFullAddressName(getFullAddressName(response.data)))
        .catch(error => console.error(error));
    }
  };
  const handleUpdateUserPhoneModalSubmit = (data: any): void => {
    if (applicationService.isAuthenticated()) {
      void applicationService
        .createApiClient()
        .patch(AppRoutingConstants.UPDATE_PHONE_PATH, {
          phone: data.phone
        })
        .then(response => updateUserData?.(response.data))
        .catch(error => console.error(error));
    }
  };
  return (
    <div className="user-dashboard container mt-5">
      <div className="d-flex flex-column gap-4">
        <div className="row flex-column flex-lg-row px-0 flex-nowrap gap-1 gap-lg-4">
          <div className="user-avatar col py-lg-4">
            <div className="d-flex flex-column align-items-center justify-content-center gap-lg-2">
              <div className="avatar clickable">
                <UploadAvatarWidget
                  avatarUrl={avatarUrl}
                  onUploadComplete={handleUploadComplete}
                />
              </div>
              <div className="text-color-quaternary semibold-20">{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
            </div>
          </div>
          <div className="user-profile d-flex flex-column col p-1 p-lg-3 gap-1 gap-lg-3">
            <div className="semibold-16 text-color-tertiary">
              Thông tin cá nhân
            </div>
            <div className="d-flex flex-column gap-1 gap-lg-2">
              <div
                className="d-flex justify-content-between clickable"
                onClick={() =>
                  showModal(
                    FirstnameLastnameEditFormModal,
                    handleUpdateUserFullNameModalSubmit,
                    (): void => {},
                    currentUser
                  )
                }
              >
                <div className="semibold-20 text-color-quaternary">{`${currentUser?.firstName} ${currentUser?.lastName}`}</div>
                <i className="bi bi-pencil-square text-color-quaternary"></i>
              </div>
              <div className="regular-14 text-color-tertiary">{`Email: ${currentUser?.email}`}</div>
              <div
                className="d-flex justify-content-between clickable"
                onClick={() =>
                  showModal(
                    AddressFormModal,
                    handleAddressFormModalSubmit,
                    (): void => {},
                    {
                      provinceCode: currentUser?.provinceCode,
                      districtCode: currentUser?.districtCode,
                      wardCode: currentUser?.wardCode,
                      addressDetail: currentUser?.addressDetail
                    }
                  )
                }
              >
                <div className="regular-14 text-color-tertiary">{`Địa chỉ: ${fullAddressName}`}</div>
                <i className="bi bi-pencil-square text-color-quaternary"></i>
              </div>
              <div
                className="d-flex justify-content-between clickable"
                onClick={() =>
                  showModal(
                    PhoneNumberEditFormModal,
                    handleUpdateUserPhoneModalSubmit,
                    (): void => {},
                    {
                      phone: currentUser?.phone
                    }
                  )
                }
              >
                <div className="regular-14 text-color-tertiary">{`Sđt: ${currentUser?.phone ?? ''}`}</div>
                <i className="bi bi-pencil-square text-color-quaternary"></i>
              </div>
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
              {myProducts
                .slice(0, 3)
                .map((product: ProductWithOwnerDTO, index: number) => (
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
