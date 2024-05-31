import {ReactElement} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import TestLoginComponent from '../modules/dev/TestLoginComponent.tsx';
import AppHeader from '../modules/shared/components/header/AppHeader.tsx';
import AppFooter from '../modules/shared/components/footer/AppFooter.tsx';
import HomepageComponent from '../modules/homepage/HomepageComponent.tsx';
import './App.scss';
import PostProduct from '../modules/dev/postProduct/PostProduct.tsx';

export default function App(): ReactElement {
  return (
    <Router>
      <div className="app">
        <div className="header">
          <AppHeader />
        </div>
        <div className="body">
          <Routes>
            <Route path="/" element={<HomepageComponent />}></Route>
            <Route path="/dev" element={<TestLoginComponent />}></Route>
            <Route path="/post-product" element={<PostProduct />}></Route>
          </Routes>
        </div>
        <div className="footer">
          <AppFooter />
        </div>
      </div>
    </Router>
  );
}
