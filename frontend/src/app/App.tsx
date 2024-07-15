import './App.scss';
import {ReactElement, useContext, useEffect} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import TestLoginComponent from '../modules/dev/TestLoginComponent.tsx';
import AppHeader from '../modules/shared/components/header/AppHeader.tsx';
import AppFooter from '../modules/shared/components/footer/AppFooter.tsx';
import HomepageComponent from '../modules/homepage/HomepageComponent.tsx';
import PostProduct from '../modules/products/components/post-product/PostProduct.tsx';
import {ModalProvider} from '../modules/shared/components/modal/ModalContext.tsx';
import {LoadingProvider} from '../modules/shared/components/loading/LoadingContext.tsx';
import FullScreenSpinner from '../modules/shared/components/loading/loading-spinner/FullScreenSpinner.tsx';
import ProductDetail from '../modules/shared/components/product-detail/ProductDetail.tsx';
import ProductList from '../modules/homepage/components/product-list/ProductList.tsx';
import {useApplicationService} from '../modules/shared/services/application.service.ts';
import {UserDto} from '../modules/shared/models/userDto.ts';
import ExchangeRequest from '../modules/transactions/components/ExchangeRequest.tsx';
import UserProfile from '../modules/shared/components/user-profile/UserProfile.tsx';
import ExchangeDetail from '../modules/transactions/components/ExchangeDetail.tsx';
import ChatList from '../modules/chat/ChatList.tsx';
import SellerProfile from '../modules/shared/components/seller-profile/SellerProfile.tsx';
import {UserProvider} from '../modules/shared/services/userProvider.tsx';
import {UserContext} from '../modules/shared/services/userContext.ts';
import UserDashboard from '../modules/user/UserDashboard.tsx';
import EditProduct from '../modules/products/components/edit-product/EditProduct.tsx';
import OderHistory from '../modules/user/OderHistory.tsx';

export default function App(): ReactElement {
  const applicationService = useApplicationService();
  const setUser = useContext(UserContext)?.setUser ?? ((): void => {});

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .fetchCurrentUser()
        .then((user: UserDto) => {
          setUser(user);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [applicationService.isAuthenticated()]);
  return (
    <Router>
      <LoadingProvider>
        <FullScreenSpinner />
        <ModalProvider>
          <UserProvider>
            <div className="app">
              <div className="header">
                <AppHeader />
              </div>
              <div className="body">
                <Routes>
                  <Route path="/" element={<HomepageComponent />}></Route>
                  <Route path="/products" element={<ProductList />}></Route>
                  <Route
                    path="/products/:id"
                    element={<ProductDetail />}
                  ></Route>
                  <Route
                    path="/products/modify/:id"
                    element={<EditProduct />}
                  ></Route>
                  <Route path="/post-product" element={<PostProduct />}></Route>
                  <Route path="/user-profile" element={<UserProfile />}></Route>
                  <Route
                    path="/seller-profile/:id"
                    element={<SellerProfile />}
                  ></Route>
                  <Route path="/chat" element={<ChatList />}></Route>
                  <Route path="/oder-history" element={<OderHistory />}></Route>
                  <Route
                    path="/exchange-request/:id"
                    element={<ExchangeRequest />}
                  ></Route>
                  <Route
                    path="/exchange-detail/:id"
                    element={<ExchangeDetail />}
                  ></Route>
                  <Route
                    path="/user/dashboard"
                    element={<UserDashboard />}
                  ></Route>
                  <Route path="/dev" element={<TestLoginComponent />}></Route>
                  <Route path="*" element={<div>Not Found</div>}></Route>
                </Routes>
              </div>
              <div className="footer">
                <AppFooter />
              </div>
            </div>
          </UserProvider>
        </ModalProvider>
      </LoadingProvider>
    </Router>
  );
}
