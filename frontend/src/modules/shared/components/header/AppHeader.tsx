import './AppHeader.scss';
import {ReactElement, useContext, useState} from 'react';
import AppButton from '../buttons/AppButton.tsx';
import {useNavigate} from 'react-router-dom';
import ProfileOffCanvas from '../popup-profile/ProfileOffCanvas.tsx';
import {AppRoutingConstants} from '../../app-routing.constants.ts';
import NotificationItem from '../notification-item/NotificationItem.tsx';
import {formatDistanceToNow} from 'date-fns';
import {vi} from 'date-fns/locale';
import {useModal} from '../modal/useModal.tsx';
import {useApplicationService} from '../../services/application.service.ts';
import {UserContext} from '../../services/userContext.ts';
import {NotificationDto, UserDto} from '../../models/userDto.ts';

export default function AppHeader(): ReactElement {
  const user: UserDto | null | undefined = useContext(UserContext)?.user;
  const applicationService = useApplicationService();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState<string>('');
  const handleSearchAction = (): void => {
    navigate(`/products?q=${searchCriteria}`);
  };
  const modalContext = useModal();
  if (!modalContext) {
    // handle the case where modalContext is null
    // for example, you could return a loading spinner
    return <div>Loading...</div>;
  }
  return (
    <div className="app-header position-sticky">
      <div className="container py-3 d-flex justify-content-between">
        <div className="logo" onClick={() => navigate('/')}>
          <svg
            width="120"
            height="51"
            viewBox="0 0 120 51"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_4106_988)">
              <path
                d="M36.6836 21.5859C38.0645 18.1723 39.446 14.7597 40.8279 11.3482L37.933 12.5742C36.0589 7.33861 30.4095 3.4395 23.2851 3.4395C14.7092 3.4395 8.29787 8.64673 8.29787 15.5739C8.29787 31.6469 30.3448 25.1031 30.3448 34.1937C30.3448 36.7973 27.9311 38.7698 23.9303 38.7698C19.0208 38.7698 16.5992 36.0131 16.2884 32.1976L19.3616 31.1057L9.38641 26.3608C7.80881 29.686 6.22754 33.0108 4.64258 36.335L7.52484 35.314C9.2602 42.2144 15.4602 47.0287 23.3008 47.0287C32.7664 47.0287 39.8735 41.1209 39.8735 33.1807C39.8735 18.6304 17.5142 23.5236 17.5142 15.5818C17.5142 13.3585 19.991 11.7064 23.2929 11.7064C26.5586 11.7064 29.0165 14.0086 29.0669 16.3345L26.4466 17.4391L36.6836 21.5859Z"
                fill="white"
              />
              <path
                d="M61.9764 17.8998L57.6222 3.79296H53.0472L48.7246 17.8998L44.3704 3.79296H39.9531L46.579 24.3063H50.8386L55.3505 10.3888L59.8309 24.3063H64.0904L70.7163 3.79296H66.299L61.9764 17.8998Z"
                fill="white"
              />
              <path
                d="M81.4749 24.8996C84.3461 24.8996 87.028 23.4163 87.943 22.2802V24.3H92.5181V14.1443C92.5181 8.24277 88.0377 3.44581 82.1059 3.44581C76.1741 3.44581 71.3467 8.24277 71.3467 14.1443C71.3467 20.0774 76.182 24.8996 81.4749 24.8996ZM82.1059 7.54217C85.3873 7.54217 88.1323 10.3825 88.1323 14.138C88.1323 17.9251 85.3873 20.7969 82.1059 20.7969C78.8245 20.7969 76.0795 17.9251 76.0795 14.138C76.0795 10.3825 78.8245 7.54217 82.1059 7.54217Z"
                fill="white"
              />
              <path
                d="M120 14.1443C120 21.6885 113.916 28.0618 106.716 28.0618C105.922 28.0607 105.129 27.9824 104.35 27.8283C104.235 27.8049 104.117 27.8073 104.003 27.8353C103.89 27.8633 103.784 27.9162 103.693 27.9902C103.603 28.0642 103.53 28.1575 103.479 28.2632C103.429 28.3689 103.403 28.4845 103.403 28.6015V48.5578C103.403 48.9763 103.237 49.3776 102.941 49.6735C102.645 49.9695 102.244 50.1357 101.826 50.1357H94.0955C93.6771 50.1357 93.2758 49.9695 92.98 49.6735C92.6841 49.3776 92.5179 48.9763 92.5179 48.5578V48.1633C92.5178 48.012 92.4742 47.8639 92.3923 47.7367C92.3104 47.6095 92.1937 47.5085 92.056 47.4458C91.9183 47.3831 91.7655 47.3614 91.6158 47.3831C91.4661 47.4048 91.3258 47.4691 91.2117 47.5684C91.0013 47.7451 90.791 47.9161 90.5806 48.0812C88.3316 49.7861 85.5872 50.7092 82.7652 50.7101H82.7494C79.5487 50.7075 76.4606 49.5281 74.0726 47.3964C73.9589 47.2959 73.8186 47.2304 73.6686 47.2076C73.5185 47.1849 73.3651 47.206 73.2267 47.2683C73.0883 47.3306 72.9709 47.4315 72.8884 47.5589C72.8059 47.6863 72.7619 47.8348 72.7617 47.9865V48.5688C72.7617 48.776 72.7209 48.9812 72.6416 49.1727C72.5623 49.3641 72.4461 49.5381 72.2996 49.6846C72.1531 49.8311 71.9792 49.9473 71.7878 50.0266C71.5964 50.1059 71.3912 50.1468 71.1841 50.1468H41.4574C41.2502 50.1468 41.0451 50.1059 40.8537 50.0266C40.6623 49.9473 40.4883 49.8311 40.3418 49.6846C40.1954 49.5381 40.0791 49.3641 39.9999 49.1727C39.9206 48.9812 39.8798 48.776 39.8798 48.5688V44.7817C39.8798 44.6241 39.8326 44.47 39.7442 44.3394C39.6559 44.2088 39.5304 44.1077 39.3841 44.0491C39.2377 43.9905 39.0772 43.9771 38.9231 44.0107C38.7691 44.0442 38.6286 44.1232 38.5199 44.2373C34.9608 47.9124 29.5623 50.1736 23.3071 50.1736C15.6431 50.1736 9.0898 46.1987 5.91725 39.9548C5.83056 39.7842 5.68484 39.6509 5.50722 39.5798C5.3296 39.5087 5.13219 39.5046 4.95176 39.5682L2.11208 40.5765C1.81803 40.6811 1.49956 40.6961 1.19698 40.6196C0.89439 40.5432 0.621282 40.3786 0.412202 40.1469C0.203122 39.9151 0.0674631 39.6265 0.0223954 39.3176C-0.0226723 39.0087 0.0248724 38.6934 0.159015 38.4116L7.04996 23.9213C7.10446 23.8069 7.13062 23.6811 7.12622 23.5545C7.12183 23.4278 7.08702 23.3041 7.02472 23.1938C5.77211 21.0557 5.14107 18.5073 5.14107 15.5708C5.14107 6.85418 12.9423 0.280449 23.2835 0.280449C27.3158 0.280449 31.1194 1.35345 34.2809 3.38112C34.5964 3.58625 34.9119 3.80085 35.2132 4.02176C35.3479 4.11977 35.5101 4.17265 35.6766 4.17282C35.8431 4.17299 36.0054 4.12044 36.1403 4.0227C36.2751 3.92497 36.3756 3.78706 36.4272 3.62872C36.4789 3.47039 36.4792 3.29976 36.428 3.14127L36.2813 2.68998C36.2049 2.45322 36.1856 2.20175 36.2249 1.95611C36.2643 1.71046 36.3611 1.4776 36.5075 1.27651C36.6539 1.07543 36.8458 0.911823 37.0675 0.799048C37.2892 0.686273 37.5344 0.627525 37.7831 0.627598H45.5323C45.8686 0.626905 46.1963 0.733698 46.4676 0.9324C46.7389 1.1311 46.9396 1.41131 47.0405 1.73216L47.9555 4.69713C48.0054 4.85792 48.1055 4.99852 48.241 5.09837C48.3766 5.19822 48.5405 5.25209 48.7088 5.25209C48.8771 5.25209 49.0411 5.19822 49.1766 5.09837C49.3121 4.99852 49.4122 4.85792 49.4621 4.69713L50.3692 1.73689C50.4714 1.41538 50.6739 1.13508 50.9471 0.937142C51.2202 0.7392 51.5496 0.63403 51.8869 0.637065H58.7936C59.1299 0.636372 59.4576 0.743166 59.7289 0.941868C60.0002 1.14057 60.2009 1.42078 60.3018 1.74163L61.2168 4.70659C61.2667 4.86739 61.3668 5.00799 61.5023 5.10784C61.6378 5.20769 61.8018 5.26155 61.9701 5.26155C62.1384 5.26155 62.3024 5.20769 62.4379 5.10784C62.5734 5.00799 62.6735 4.86739 62.7234 4.70659L63.6305 1.74636C63.7306 1.42463 63.931 1.14338 64.2023 0.943774C64.4737 0.744167 64.8018 0.636687 65.1387 0.637065H72.9904C73.2277 0.637038 73.4616 0.693123 73.6731 0.800743C73.8846 0.908362 74.0676 1.06447 74.2073 1.25632C74.3469 1.44817 74.4393 1.67034 74.4767 1.90468C74.5142 2.13903 74.4957 2.37891 74.4229 2.60477C76.6991 1.0905 79.372 0.282948 82.1058 0.283605C84.3569 0.269139 86.5753 0.823252 88.5554 1.8946C90.5355 2.96594 92.2131 4.51986 93.4329 6.41235C93.5044 6.52309 93.6025 6.61413 93.7183 6.67717C93.834 6.74021 93.9637 6.77324 94.0955 6.77324C94.2273 6.77324 94.357 6.74021 94.4728 6.67717C94.5885 6.61413 94.6866 6.52309 94.7581 6.41235C95.9779 4.51986 97.6556 2.96594 99.6357 1.8946C101.616 0.823252 103.834 0.269139 106.085 0.283605C113.757 0.283605 120 6.50545 120 14.1443Z"
                fill="white"
              />
              <path
                d="M106.086 3.4395C100.154 3.4395 95.6738 8.23646 95.6738 14.138V46.9798H100.249V22.2865C101.164 23.4226 103.846 24.9059 106.717 24.9059C112.018 24.9059 116.845 20.0774 116.845 14.1443C116.845 8.24277 112.018 3.4395 106.086 3.4395ZM106.086 20.7969C102.805 20.7969 100.06 17.9251 100.06 14.138C100.06 10.3825 102.805 7.54217 106.086 7.54217C109.367 7.54217 112.112 10.3825 112.112 14.138C112.112 17.9314 109.367 20.7969 106.086 20.7969Z"
                fill="white"
              />
              <path
                d="M62.2492 27.5979C59.5373 27.5979 57.6142 28.6772 56.33 29.9901C55.0427 28.6772 53.1496 27.5979 50.4677 27.5979C45.716 27.5979 43.0325 30.3104 43.0293 35.3298V46.9909H47.2573V34.8612C47.2573 32.7893 48.6566 31.3897 50.728 31.3897C52.7994 31.3897 54.1987 32.7893 54.1987 34.8612V46.9909H58.4267V34.8612C58.4267 32.7893 59.826 31.3897 61.8974 31.3897C63.9688 31.3897 65.3681 32.7893 65.3681 34.8612V46.9909H69.5961V35.3298C69.5976 30.3104 66.9741 27.5979 62.2492 27.5979Z"
                fill="white"
              />
              <path
                d="M82.7485 27.7257C77.2711 27.7257 72.8096 32.1597 72.8096 37.6131C72.802 40.0014 73.6572 42.312 75.2176 44.1197C76.7781 45.9274 78.9388 47.1105 81.3022 47.4512C83.6655 47.7919 86.0723 47.2673 88.0796 45.974C90.087 44.6807 91.5597 42.7056 92.2267 40.4124H87.6769C86.7729 42.4543 84.8782 43.7671 82.7501 43.7671C80.1249 43.7671 77.88 41.7836 77.3263 39.0128H92.5454C93.3026 31.9546 87.7968 27.7257 82.7485 27.7257ZM77.4998 35.5081C78.2886 33.1175 80.3569 31.5128 82.7485 31.5128C85.1149 31.5128 87.1516 33.0907 87.9088 35.4797L77.4998 35.5081Z"
                fill="white"
              />
              <path
                d="M17.5568 15.5203C17.5568 13.2969 20.0336 11.6448 23.3324 11.6448C26.5996 11.6448 29.0575 13.9471 29.108 16.273L26.486 17.3775L36.7215 21.5244L40.8658 11.2866L37.9725 12.5127C36.0999 7.27865 30.4505 3.38585 23.3324 3.38585C14.7581 3.38585 8.3452 8.59308 8.3452 15.5203C8.3452 31.5932 30.3906 25.0495 30.3906 34.1401C30.3906 36.7452 27.9784 38.7161 23.976 38.7161C19.0681 38.7161 16.6449 35.961 16.3357 32.1455L19.3979 31.0536L9.42743 26.3087C7.84983 29.6329 6.26855 32.9576 4.68359 36.2829L7.56429 35.2588C9.29965 42.1608 15.5012 46.9751 23.3403 46.9751C32.8059 46.9751 39.9129 41.0657 39.9129 33.127C39.9145 18.5689 17.5568 23.4621 17.5568 15.5203Z"
                fill="#88D9E2"
              />
              <path
                d="M44.4095 3.733L48.7636 17.8399L53.0863 3.733H57.6613L62.0155 17.8399L66.3381 3.733H70.7553L64.1294 24.2463H59.8699L55.3895 10.3288L50.8776 24.2463H46.6181L39.9922 3.733H44.4095Z"
                fill="#FF9FB4"
              />
              <path
                d="M87.9831 24.2463V22.2265C87.0681 23.3627 84.3861 24.8459 81.5149 24.8459C76.2142 24.8459 71.3867 20.0174 71.3867 14.0843C71.3867 8.18281 76.2142 3.38585 82.1459 3.38585C88.0777 3.38585 92.5581 8.18281 92.5581 14.0843V24.2463H87.9831ZM82.1459 20.7433C85.4273 20.7433 88.1724 17.8714 88.1724 14.0843C88.1724 10.3288 85.4273 7.48851 82.1459 7.48851C78.8645 7.48851 76.1195 10.3288 76.1195 14.0843C76.1195 17.8714 78.8645 20.7433 82.1459 20.7433Z"
                fill="#FF9FB4"
              />
              <path
                d="M106.125 3.38585C112.057 3.38585 116.884 8.18281 116.884 14.0843C116.884 20.0174 112.057 24.8459 106.756 24.8459C103.885 24.8459 101.203 23.3627 100.288 22.2265V46.9198H95.7129V14.0843C95.7129 8.18281 100.193 3.38585 106.125 3.38585ZM106.125 20.7433C109.406 20.7433 112.151 17.8714 112.151 14.0843C112.151 10.3288 109.406 7.48851 106.125 7.48851C102.844 7.48851 100.099 10.3288 100.099 14.0843C100.099 17.8714 102.844 20.7433 106.125 20.7433Z"
                fill="#FFE088"
              />
              <path
                d="M50.5087 27.5379C53.1906 27.5379 55.0837 28.6172 56.3695 29.9301C57.6536 28.6172 59.5767 27.5379 62.2886 27.5379C67.0214 27.5379 69.6371 30.2504 69.6371 35.2699V46.9372H65.4091V34.8012C65.4091 32.7294 64.0098 31.3297 61.9384 31.3297C59.867 31.3297 58.4677 32.7294 58.4677 34.8012V46.9341H54.2397V34.8012C54.2397 32.7294 52.8404 31.3297 50.769 31.3297C48.6976 31.3297 47.2983 32.7294 47.2983 34.8012V46.9341H43.0703V35.2667C43.0735 30.2504 45.757 27.5379 50.5087 27.5379Z"
                fill="#9CE3D7"
              />
              <path
                d="M82.7875 47.4942C80.153 47.4896 77.6276 46.4408 75.7647 44.5775C73.9018 42.7142 72.8532 40.1883 72.8486 37.5532C72.8486 32.0998 77.3101 27.6657 82.7875 27.6657C87.8358 27.6657 93.3416 31.8946 92.5844 38.9528H77.3653C77.919 41.7237 80.164 43.7072 82.7891 43.7072C84.9173 43.7072 86.812 42.3943 87.7159 40.3524H92.2736C91.6767 42.4085 90.4298 44.2158 88.7196 45.5033C87.0093 46.7909 84.928 47.4894 82.7875 47.4942ZM87.9478 35.4198C87.1906 33.0276 85.1492 31.4528 82.7875 31.4528C80.3959 31.4528 78.326 33.0576 77.5388 35.4482L87.9478 35.4198Z"
                fill="#9CE3D7"
              />
            </g>
            <defs>
              <clipPath id="clip0_4106_988">
                <rect
                  width="120"
                  height="50.4202"
                  fill="white"
                  transform="translate(0 0.289917)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="d-flex align-items-center">
          <div className="search d-flex align-items-center gap-2 px-3">
            <div className="search-btn clickable" onClick={handleSearchAction}>
              <i className="search-icon bi bi-search"></i>
            </div>
            <input
              className="search-bar regular-14"
              type="text"
              placeholder="Search"
              value={searchCriteria}
              onChange={e => setSearchCriteria(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearchAction();
                }
              }}
            />
          </div>
        </div>
        <div className="search-and-actions d-flex align-items-center">
          <div className="actions d-flex flex-row">
            <div className="user-actions-detail d-flex align-items-center gap-4 px-5">
              <div className="notification-wrapper">
                <div
                  className="notification-button-wrapper clickable"
                  onClick={() =>
                    applicationService.checkIsUserDoActionOrElseNavigateLoginPage(
                      () => setShowNotifications(!showNotifications)
                    )
                  }
                >
                  {user?.notifications.length !== 0 ? (
                    <i className="fs-5 bi bi-bell-fill"></i>
                  ) : (
                    <i className="fs-5 bi bi-bell"></i>
                  )}
                </div>
                {showNotifications && (
                  <div className="list-group">
                    {user?.notifications.length !== 0 && (
                      <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <div className="mb-1 semibold-20 text-color-tertiary">
                            Thông báo
                          </div>
                        </div>
                      </div>
                    )}
                    {user?.notifications.length === 0 && (
                      <div className="list-group-item">
                        <div className="d-flex w-100 justify-content-between">
                          <div className="mb-1 semibold-20 text-color-tertiary">
                            Không có thông báo mới
                          </div>
                        </div>
                      </div>
                    )}
                    {user?.notifications.map(
                      (notification: NotificationDto, index: number) => (
                        <NotificationItem
                          key={index}
                          title={notification.title}
                          time={formatDistanceToNow(
                            new Date(notification.creationDate),
                            {
                              addSuffix: true,
                              locale: vi
                            }
                          )}
                          content={notification.content}
                          onClickFn={() => {
                            setShowNotifications(false);
                            navigate(
                              `/exchange-detail/${notification.exchangeId}`
                            );
                          }}
                        />
                      )
                    )}
                  </div>
                )}
              </div>
              <div
                className="chat clickable"
                onClick={() =>
                  applicationService.checkIsUserDoActionOrElseNavigateLoginPage(
                    () => navigate('/chat')
                  )
                }
              >
                <i className="fs-5 bi bi-chat-left-text"></i>
              </div>
              <div
                className="cart clickable"
                onClick={() =>
                  applicationService.checkAuthenticatedDoActionOrElseNavigateLoginPage(
                    () => {}
                  )
                }
              >
                <i className="fs-5 bi bi-bag"></i>
              </div>
              <div
                className="user-info d-flex flex-row align-items-center gap-2 btn"
                data-bs-toggle={user ? 'offcanvas' : undefined}
                data-bs-target="#popup-profile"
                aria-controls="popup-profile"
                onClick={() => !user && applicationService.signIn()}
              >
                <i className="user-avatar fs-5 bi bi-person-circle"></i>
                <div className="user-full-name regular-14">
                  {user ? `${user.firstName} ${user.lastName}` : 'Đăng Nhập'}
                </div>
              </div>
              {user && <ProfileOffCanvas currentUser={user} />}
            </div>
            <AppButton
              onClick={() =>
                applicationService.checkIsUserDoActionOrElseNavigateLoginPage(
                  () => navigate(AppRoutingConstants.POST_PRODUCT)
                )
              }
              variant="primary"
              children={`Đăng tin ngay`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
