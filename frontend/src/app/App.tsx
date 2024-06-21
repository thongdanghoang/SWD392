import './App.scss';
import {ReactElement, useEffect, useState} from 'react';
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
import ProductList from '../modules/homepage/components/productlist/ProductList.tsx';
import {useApplicationService} from '../modules/shared/services/application.service.ts';
import {UserDto} from '../modules/shared/models/userDto.ts';
import ExchangeRequest from '../modules/transactions/components/ExchangeRequest.tsx';
import UserProfile from '../modules/shared/components/user-profile/UserProfile.tsx'

export default function App(): ReactElement {
  const applicationService = useApplicationService();
  const [currentUser, setCurrentUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (applicationService.isAuthenticated()) {
      applicationService
        .fetchCurrentUser()
        .then((user: UserDto) => {
          setCurrentUser(user);
        })
        .catch(error => {
          console.error(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicationService.isAuthenticated()]);
  return (
    <Router>
      <LoadingProvider>
        <FullScreenSpinner />
        <ModalProvider>
          <div className="app">
            <div className="header">
              <AppHeader currentUser={currentUser} />
            </div>
            <div className="body">
              <Routes>
                <Route path="/" element={<HomepageComponent />}></Route>
                <Route path="/products" element={<ProductList />}></Route>
                <Route path="/products/:id" element={<ProductDetail />}></Route>
                <Route path="/post-product" element={<PostProduct />}></Route>
                <Route path='/user-profile' element={<UserProfile/>}></Route>
                <Route
                  path="/exchange-request/:id"
                  element={<ExchangeRequest />}
                ></Route>
                <Route path="/dev" element={<TestLoginComponent />}></Route>
              </Routes>
            </div>
            <div className="footer">
              <AppFooter />
            </div>
          </div>
        </ModalProvider>
      </LoadingProvider>
    </Router>
  );
}
