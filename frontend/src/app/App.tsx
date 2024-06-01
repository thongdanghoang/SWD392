import './App.scss';
import {ReactElement} from 'react';
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

export default function App(): ReactElement {
  return (
    <Router>
      <LoadingProvider>
        <FullScreenSpinner />
        <ModalProvider>
          <div className="app">
            <div className="header">
              <AppHeader />
            </div>
            <div className="body">
              <Routes>
                <Route path="/" element={<HomepageComponent />}></Route>
                <Route path="/dev" element={<TestLoginComponent />}></Route>
                <Route path="/product" element={<ProductDetail />}></Route>
                <Route path="/post-product" element={<PostProduct />}></Route>
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
