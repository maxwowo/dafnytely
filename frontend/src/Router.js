import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import FullSizeLayout from './components/FullSizeLayout/FullSizeLayout';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import QueryPage from './pages/QueryPage/QueryPage';
import DonatePage from './pages/DonatePage/DonatePage';
import RequestPage from './pages/RequestPage/RequestPage';
import AdminPage from './pages/AdminPage/AdminPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const Router = () => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <BrowserRouter>
      <FullSizeLayout>
        <Navbar/>
        <Switch>
          <Route
            exact
            path='/'
            component={LandingPage}
          />
          <Route
            path='/query'
            component={QueryPage}
          />
          <Route
            path='/donate'
            component={DonatePage}
          />
          <Route
            path='/request'
            component={RequestPage}
          />
          <Route
            path='/admin'
            component={AdminPage}
          />
          <Route
            component={NotFoundPage}
          />
        </Switch>
      </FullSizeLayout>
    </BrowserRouter>
  </div>
);

export default Router;
